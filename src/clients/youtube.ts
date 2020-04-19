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
import youtubeFixture from './youtube-fixture.json';

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

export async function search({
  query,
  nextPageToken,
}: {
  query: string;
  nextPageToken?: string;
}) {
  await loadClient();

  if (nextPageToken) {
    return {
      items: youtubeFixture.results.slice(10, 20),
      nextPageToken: undefined,
    };
  }
  return {
    items: youtubeFixture.results.slice(0, 9),
    nextPageToken: 'nextPage',
  };
  // return gapi.client.youtube.search
  //   .list({
  //     part: 'snippet',
  //     maxResults: 25,
  //     q: query,
  //     pageToken: nextPageToken,
  //   })
  //   .then(
  //     (response) => {
  //       console.log(response);
  //       return {
  //         items: response.result.items,
  //         nextPageToken: response.result.nextPageToken,
  //       };
  //     },
  //     (err) => {
  //       console.error('Execute error', err);
  //     }
  //   );
}

export async function list(id: string) {
  await loadClient();

  return gapi.client.youtube.videos
    .list({
      part: 'snippet,contentDetails',
      maxResults: 25,
      id,
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
