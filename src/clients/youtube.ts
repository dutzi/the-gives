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

type SearchResult = gapi.client.youtube.youtube.SearchResult;

export async function search({
  query,
  nextPageToken,
  useFallback,
}: {
  query: string;
  nextPageToken?: string;
  useFallback: boolean;
}) {
  await loadClient();

  if (useFallback) {
    const youtubeFixture = await import('./youtube-fixture.json');
    if (nextPageToken) {
      return {
        items: youtubeFixture.results.slice(10, 20) as SearchResult[],
        nextPageToken: undefined,
      };
    }

    return {
      items: youtubeFixture.results.slice(0, 9) as SearchResult[],
      nextPageToken: 'nextPage',
    };
  }

  return gapi.client.youtube.search
    .list({
      part: 'snippet',
      maxResults: 25,
      q: query,
      pageToken: nextPageToken,
    })
    .then((response) => {
      console.log(response);
      return {
        items: response.result.items,
        nextPageToken: response.result.nextPageToken,
      };
    });
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
