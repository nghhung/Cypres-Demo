import http from "k6/http";
import { Trend } from "k6/metrics";
import { check, group, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

var myTrend = new Trend("waiting_time");
var token;

export let options = {
    discardResponseBodies: false,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: 10,
        iterations: 200,
        maxDuration: '10s',
      },
    },
  };

export default function() {
  group("create user", function() {
    
    group("get token", function() {
      var url = "https://csm-global-api-staging.enouvo.com/api/v1/auth/login";
      var payload = JSON.stringify({
        email: "admin@enouvo.com",
        password: "enouvo123"
      });

      var params = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      var res = http.post(url, payload, params);
      sleep(0.1);
      console.log(`VU-------------: ${__VU}  -  ITER: ${__ITER}`);

      myTrend.add(res.timings.waiting);
      var jsonData = JSON.parse(res.body);
      sleep(0.1);

      const result = check(res, {
        'is status 200': (r) => r.status === 200,
      });

      const responseEmail = check(jsonData, {
          'is email correct': (r) => r.email == "admin@enouvo.com",
      })

      errorRate.add(!result);
      errorRate.add(!responseEmail);

    //   token = jsonData.data.token.accessToken;
      console.log("Response time was " + String(res.timings.duration) + " ms");
      console.log("body---------" + res.body);
      console.log("body type" + typeof jsonData);
      console.log("email" + jsonData.email);
    });
    
    // group("create user", function() {
    //   var url1 = "https://highlands-llen-api-dev.enouvo.com/api/users";
    //   var payload1 = JSON.stringify({
    //     roleSlugs: ["staff_role"],
    //     firstName: "User 854",
    //     middleName: "middle",
    //     lastName: "Last 265",
    //     email: "test+t323imestamp@test.com",
    //     phone: "123456",
    //     gender: 0,
    //     dateOfBirth: "123123123",
    //     address: {
    //       street: "15 Ta My Duat",
    //       city: "Da Nang",
    //       state: "Viet Nam",
    //       postCode: "55000",
    //     },
    //   });

    //   var params1 = {
    //     headers: {
    //       "Authorization": "Bearer " + token,
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   console.log("token1123123" + token);

    //   var res = http.post(url1, payload1, params1);
    //   sleep(1);
    //   console.log("body123"+res.body);
    // //   //   myTrend.add(res.timings.waiting);
    // //   var jsonData = JSON.parse(res.body);
    // //   sleep(1);
    // //   console.log("Response time was " + String(res.timings.duration) + " ms");
    // //   console.log("body---------create" + jsonData);
    // // //   console.log("body type" + typeof jsonData);
    // // //   console.log("message" + jsonData.message);
    // });
  });
}
