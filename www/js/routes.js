var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home'
  },
  // Login page
  {
    path: '/login/',
    componentUrl: './pages/login.html',
    name: 'login'
  },
  // Eval page
  {
    path: '/eval/',
    componentUrl: './pages/eval.html',
    name: 'eval'
  },
  {
    path: '/pg/',
    componentUrl: './pages/pg.html',
    name: 'pg'
  },
  // Status page
  {
    path: '/status/',
    async: function (routeTo, routeFrom, resolve, reject) {
      var username = localStorage.getItem("username");
      var token = localStorage.getItem("token");
      app.request.post('http://nestle.liveapps.top/index.php/app/supstatus/', { username:username, token:token }, function (raw) {
        if(raw=='invalid'){
          app.dialog.alert('Phiên làm việc đã hết hạn', 'Thông báo', function(){
            resolve(
              {
                componentUrl: './pages/login.html',
                name: 'login'
              }
            );
          });
          return;
        }
        try{
          var json = JSON.parse(raw);
          app.data.checkin = json.checkin;
          app.data.checkout = json.checkout;
          app.data.pg = json.pg;
          resolve(
            {
              componentUrl: './pages/status.html',
              name: 'status'
            },
            {
              context: {
                fullname: localStorage.getItem("fullname"),
                loggedin: localStorage.getItem("loggedin"),
                //location: localStorage.getItem("location"),
                checkin: json.checkin!='' ? json.checkin : '<span class="text-color-red">Bạn chưa checkin</span>',
                checkout:json.checkout!='' ? json.checkout : '<span class="text-color-red">Bạn chưa checkout</span>',
                //reports:json.reports,
                //sum_reports:json.sum_reports,
                //empty_reports:json.reports.length==0,
                workday:json.workday
              }
            }
          );
        }
        catch(e){
          app.dialog.alert('Vui lòng cập nhật phiên bản mới', 'Báo lỗi');
          return;
        }
      },function(){
        app.dialog.alert('Vui lòng kiểm tra lại kết nối', 'Báo lỗi');
      });
    }
  },
  // report page
  {
    path: '/report/',
    async: function (routeTo, routeFrom, resolve, reject) {
      var username = localStorage.getItem("username");
      var token = localStorage.getItem("token");
      app.request.post('http://nestle.liveapps.top/index.php/app/evals/', { username:username, token:token }, function (raw) {
        if(raw=='invalid'){
          app.dialog.alert('Phiên làm việc đã hết hạn', 'Thông báo', function(){
            resolve(
              {
                componentUrl: './pages/login.html',
                name: 'login'
              }
            );
          });
          return;
        }
        try{
          var json = JSON.parse(raw);
          resolve(
            {
              componentUrl: './pages/report.html',
              name: 'status'
            },
            {
              context: {
                evals:json.evals
              }
            }
          );
        }
        catch(e){
          app.dialog.alert('Vui lòng cập nhật phiên bản mới', 'Báo lỗi');
          return;
        }
      },function(){
        app.dialog.alert('Vui lòng kiểm tra lại kết nối', 'Báo lỗi');
      });
    }
  },
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
