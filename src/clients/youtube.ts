// function authenticate() {
//   return gapi.auth2
//     .getAuthInstance()
//     .signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
//     .then(
//       function () {
//         console.log('Sign-in successful');
//       },
//       function (err: any) {
//         console.error('Error signing in', err);
//       }
//     );
// }

function loadClient() {
  gapi.client.setApiKey('AIzaSyDsDpK7JObmGRAQTDRhytLFYubk9NLtC74');
  return gapi.client.load('youtube', 'v3').then(
    function () {
      console.log('GAPI client loaded for API');
    },
    function (err: any) {
      console.error('Error loading GAPI client for API', err);
    }
  );
}

export async function search(query: string) {
  await loadClient();

  return gapi.client.youtube.search
    .list({
      part: 'snippet',
      maxResults: 25,
      q: query,
    })
    .then(
      (response) => {
        return response.result.items;
      },
      (err) => {
        console.error('Execute error', err);
      }
    );
}
