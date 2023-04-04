// const { google } = require("googleapis");
// const youtube = google.youtube({
//   version: "v3",
//   auth: "AIzaSyAjaQHRsP0tbsR1Vtflv3zFcbZAVPcuvy8",
// });

// const videoIds = [
//   "XqZsoesa55w",
//   "kJQP7kiw5Fk",
//   "F4tHL8reNCs",
//   "JGwWNGJdvx8",
//   "RgKAFK5djSk",
//   "WRVsOCh907o",
//   "hq3yfQnllfQ",
//   "OPf0YbXqDm0",
//   "MqnF2zSQ02U",
//   "9bZkp7q19f0",
// ]; //
// async function getMonthlyViews(videoId, startTime, endTime) {
//   const totalViews = {};

//   for (let d = startTime; d < endTime; d.setMonth(d.getMonth() + 1)) {
//     const startDate = new Date(
//       d.getFullYear(),
//       d.getMonth(),
//       1,
//       0,
//       0,
//       0
//     ).toISOString();
//     const endDate = new Date(
//       d.getFullYear(),
//       d.getMonth() + 1,
//       0,
//       23,
//       59,
//       59,
//       999
//     ).toISOString();

//     //console.log(startDate);
//     //console.log(endDate);

//     const res = await youtube.videos.list({
//       part: "statistics",
//       id: videoId,
//       //publishedAfter: startDate,
//       publishedBefore: endDate,
//     });

//     const video = res.data.items[0];
//     const month = `${d.getFullYear()}-${(d.getMonth() + 1)
//       .toString()
//       .padStart(2, "0")}`;
//     totalViews[month] = parseInt(video.statistics.viewCount);
//   }

//   return totalViews;
// }

// async function getMonthlyViewsForVideos() {
//   for (const videoId of videoIds) {
//     console.log(`Video ID: ${videoId}`);
//     const res = await youtube.videos.list({
//       part: "snippet",
//       id: videoId,
//     });

//     const video = res.data.items[0];
//     const startTime = new Date(video.snippet.publishedAt);
//     const endTime = new Date();
//     const totalViews = await getMonthlyViews(videoId, startTime, endTime);
//     console.log(`Monthly views data: ${JSON.stringify(totalViews)}`);
//   }
// }

// getMonthlyViewsForVideos();

// const { google } = require("googleapis");
// const youtube = google.youtube({
//   version: "v3",
//   auth: "AIzaSyAjaQHRsP0tbsR1Vtflv3zFcbZAVPcuvy8",
// });

// const videoId = "XqZsoesa55w";
// const endDate = new Date("2021-03-31T23:59:59.999Z").toISOString(); // the end date to retrieve the view count until

// youtube.videos.list(
//   {
//     part: "statistics",
//     id: videoId,
//     publishedBefore: endDate,
//   },
//   (err, res) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     const video = res.data.items[0];
//     console.log(
//       `View count up until ${endDate}: ${video.statistics.viewCount}`
//     );
//   }
// );

const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = "1006793802318";
const CLIENT_SECRET = "NqXuOUZUR56fb7Jk6nYfrBvBf_rP";
const REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";
const SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/yt-analytics.readonly",
];

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authorizeUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent",
});

console.log("Visit the following URL to authorize the app:");
console.log(authorizeUrl);

// Once the user authorizes the app and grants permission, the authorization code can be exchanged for an access token and refresh token

const authorizationCode = "YOUR_AUTHORIZATION_CODE";

oauth2Client.getToken(authorizationCode, (err, tokens) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Access token:", tokens.access_token);
  console.log("Refresh token:", tokens.refresh_token);
});
