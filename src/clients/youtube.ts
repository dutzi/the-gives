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

  return {
    results: [
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/2cgk--UdRwF6SZXxWawwhzAMSsk"',
        id: {
          kind: 'youtube#video',
          videoId: 'jHt6TYnaDH8',
        },
        snippet: {
          publishedAt: '2020-03-30T14:32:55.000Z',
          channelId: 'UC554eY5jNUfDq3yDOJYirOQ',
          title:
            'Truth, reality and morality - MindwavesTV, Pxie &amp; Rem Debate',
          description:
            'Date streamed: 03/28/2020 Click▽ Follow Destiny ▻STREAM - http://www.destiny.gg/bigscreen ▻DISCORD - https://discordapp.com/invite/destiny ▻REDDIT ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/jHt6TYnaDH8/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/jHt6TYnaDH8/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/jHt6TYnaDH8/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Destiny',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/Empq0zl8oy80B7ruTnSuE2Enu2w"',
        id: {
          kind: 'youtube#video',
          videoId: 'gzK5HCqykmQ',
        },
        snippet: {
          publishedAt: '2020-02-10T19:56:42.000Z',
          channelId: 'UC554eY5jNUfDq3yDOJYirOQ',
          title: 'WHY CAN&#39;T YOU JUST BE HONEST ft. Pxie',
          description:
            'Date streamed: 02/05/2020 Click▽ Follow Destiny ▻STREAM - http://www.destiny.gg/bigscreen ▻DISCORD - https://discordapp.com/invite/destiny ▻REDDIT ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/gzK5HCqykmQ/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/gzK5HCqykmQ/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/gzK5HCqykmQ/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Destiny',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/g-FMdqC12J3O2Fzs_3_p49nFVw4"',
        id: {
          kind: 'youtube#video',
          videoId: 'NQ272vsoaXw',
        },
        snippet: {
          publishedAt: '2019-11-04T20:24:57.000Z',
          channelId: 'UC554eY5jNUfDq3yDOJYirOQ',
          title: 'Dehumanization &amp; Edgy Jokes - Destiny Discusses ft. Pxie',
          description:
            '"Instead of removing all satire, let\'s find a way to engage with it more responsibly." Click▽ Date streamed: 10/25/2019 Follow Destiny ▻STREAM ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/NQ272vsoaXw/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/NQ272vsoaXw/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/NQ272vsoaXw/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Destiny',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/UuaeaAUYGBL3_zPsGqZdXmxBv7I"',
        id: {
          kind: 'youtube#video',
          videoId: 'S9LnWQ3cQRg',
        },
        snippet: {
          publishedAt: '2019-11-01T05:21:20.000Z',
          channelId: 'UC554eY5jNUfDq3yDOJYirOQ',
          title: 'Free Will vs Determinism - Destiny Debates Pxie',
          description:
            'Support Destiny by using the code Destiny15 on https://displate.com/destinyofficial Click▽ Date streamed: 10/29/2019 Follow Destiny ▻STREAM ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/S9LnWQ3cQRg/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/S9LnWQ3cQRg/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/S9LnWQ3cQRg/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Destiny',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/0aa2LCPxA25LdJBbqmsDBJ_ghLw"',
        id: {
          kind: 'youtube#video',
          videoId: 'yFiFXxXhTDc',
        },
        snippet: {
          publishedAt: '2020-02-12T21:38:29.000Z',
          channelId: 'UC554eY5jNUfDq3yDOJYirOQ',
          title: 'Discussing the Electoral College ft. Pxie',
          description:
            'Date streamed: 02/05/2020 Click▽ Follow Destiny ▻STREAM - http://www.destiny.gg/bigscreen ▻DISCORD - https://discordapp.com/invite/destiny ▻REDDIT ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/yFiFXxXhTDc/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/yFiFXxXhTDc/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/yFiFXxXhTDc/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Destiny',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/D1iVfnGbvoQhhrHOSjI5uFZbc_M"',
        id: {
          kind: 'youtube#video',
          videoId: 'wd-LotbVN38',
        },
        snippet: {
          publishedAt: '2020-03-20T16:35:41.000Z',
          channelId: 'UC554eY5jNUfDq3yDOJYirOQ',
          title: 'Debating Pxie about her tweets ft. MindWavesTV',
          description:
            'Date streamed: 03/18/2020 Click▽ Follow Destiny ▻STREAM - http://www.destiny.gg/bigscreen ▻DISCORD - https://discordapp.com/invite/destiny ▻REDDIT ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/wd-LotbVN38/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/wd-LotbVN38/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/wd-LotbVN38/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Destiny',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/l_We1g64rHgNXuBcsJ6nKnm3RWQ"',
        id: {
          kind: 'youtube#video',
          videoId: 'wetX3qUMmFU',
        },
        snippet: {
          publishedAt: '2020-03-26T00:30:04.000Z',
          channelId: 'UC554eY5jNUfDq3yDOJYirOQ',
          title: 'Do rights exist without state? - Pxie vs MindWavesTV debate',
          description:
            'Date streamed: 03/23/2020 Click for timestamps▽ Follow Destiny ▻STREAM - http://www.destiny.gg/bigscreen ▻DISCORD ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/wetX3qUMmFU/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/wetX3qUMmFU/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/wetX3qUMmFU/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Destiny',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/Gcpue14kVPw-MyluBnsbAoh3QiI"',
        id: {
          kind: 'youtube#channel',
          channelId: 'UCRs-KSckVhWwv9rvPdG5Znw',
        },
        snippet: {
          publishedAt: '2018-10-26T09:46:13.000Z',
          channelId: 'UCRs-KSckVhWwv9rvPdG5Znw',
          title: 'Pxie - Topic',
          description: '',
          thumbnails: {
            default: {
              url:
                'https://yt3.ggpht.com/-RjQ1KJx7K1k/AAAAAAAAAAI/AAAAAAAAAAA/ApMPHQDV4eA/s88-c-k-no-mo-rj-c0xffffff/photo.jpg',
            },
            medium: {
              url:
                'https://yt3.ggpht.com/-RjQ1KJx7K1k/AAAAAAAAAAI/AAAAAAAAAAA/ApMPHQDV4eA/s240-c-k-no-mo-rj-c0xffffff/photo.jpg',
            },
            high: {
              url:
                'https://yt3.ggpht.com/-RjQ1KJx7K1k/AAAAAAAAAAI/AAAAAAAAAAA/ApMPHQDV4eA/s800-c-k-no-mo-rj-c0xffffff/photo.jpg',
            },
          },
          channelTitle: 'Pxie - Topic',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/pEzMnC9qJ-KhgdnxTdhAO2ckzmE"',
        id: {
          kind: 'youtube#video',
          videoId: 'WOkx0vp6rLw',
        },
        snippet: {
          publishedAt: '2020-04-16T20:55:15.000Z',
          channelId: 'UCes5DW7sk9WU8oqE9HGJdpg',
          title: '🔴 pxie &amp; Ask Yourself Talk About Morality',
          description:
            'I saw a convo pxie did on morality and wanted to follow up. pxie: https://www.twitch.tv/pxie My links: -------------- Discord: https://discord.gg/dUPFfby 🥕Facebook: ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/WOkx0vp6rLw/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/WOkx0vp6rLw/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/WOkx0vp6rLw/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'AY Discord Archive',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/nmFzx63QP1B8ghHQ8208yncLGbU"',
        id: {
          kind: 'youtube#video',
          videoId: 'ArloUiN9Kg8',
        },
        snippet: {
          publishedAt: '2019-12-02T21:00:01.000Z',
          channelId: 'UC554eY5jNUfDq3yDOJYirOQ',
          title:
            'Should the sale of organs be allowed? ft. Harkdan, MindwavesTV &amp; Pxie',
          description:
            'Date streamed: 11/20/2019 Click▽ Follow Destiny ▻STREAM - http://www.destiny.gg/bigscreen ▻DISCORD - https://discordapp.com/invite/destiny ▻REDDIT ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/ArloUiN9Kg8/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/ArloUiN9Kg8/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/ArloUiN9Kg8/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Destiny',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/acZr6qYFbjfMv9EGzQH7ytKM_po"',
        id: {
          kind: 'youtube#video',
          videoId: 'OVsDZSWNrXg',
        },
        snippet: {
          publishedAt: '2019-12-08T21:58:57.000Z',
          channelId: 'UCDnMIdg9SSKx0J22E5k8HmQ',
          title:
            'Diversity of Tactics #03 - Pxie (Diversity, Jordan Peterson &amp; Echo Chambers)',
          description:
            'Diversity of Tactics is an interview show primarily about the political left, how to approach common goals and work together to reach people through different ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/OVsDZSWNrXg/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/OVsDZSWNrXg/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/OVsDZSWNrXg/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Scuffed Dario',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/_dBGc8ScvuJFxen2A6HeBuvl76g"',
        id: {
          kind: 'youtube#video',
          videoId: 'hkJUK0F-DzA',
        },
        snippet: {
          publishedAt: '2020-01-04T17:00:13.000Z',
          channelId: 'UCvZODdsQoNEW7s-Wk6pn4vA',
          title: 'The UPS Hijack Shooting in South Florida Debate with Pxie',
          description:
            'Pixie and Tree debate about the UPS Shooting in the South Florida. #UPS #Police #Shooting Tree of Logic - https://www.twitch.tv/treeoflogic To Donate Live On ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/hkJUK0F-DzA/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/hkJUK0F-DzA/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/hkJUK0F-DzA/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Independent Thoughts and Words',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/2n8Kpju9rSd13KHiKYhyf4XNrVI"',
        id: {
          kind: 'youtube#video',
          videoId: 'bACFASXrKDE',
        },
        snippet: {
          publishedAt: '2018-03-05T11:02:02.000Z',
          channelId: 'UCj5v6V19CtjoeFzuiiEQpRg',
          title:
            'PXI &amp; PXIe History &amp; Development Timeline:  How PXI started',
          description:
            'This video describes the story of how PXI was developed and its history and timeline with the help of Mark Wetzel of National Instruments, one of the people who ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/bACFASXrKDE/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/bACFASXrKDE/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/bACFASXrKDE/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'ElectronicsNotes',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/BXcV0SqQwCnkXpN11V04hAfkuqY"',
        id: {
          kind: 'youtube#video',
          videoId: 'k_JrU75M4s8',
        },
        snippet: {
          publishedAt: '2018-02-13T12:11:30.000Z',
          channelId: 'UCj5v6V19CtjoeFzuiiEQpRg',
          title: 'What is PXI | PXIe PXImc - summary &amp; tutorial',
          description:
            'PXI and the later evolution of the standard, PXIe are used for a host of test, instrumentation, control and data acquisition applications. This video asks what PXI is ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/k_JrU75M4s8/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/k_JrU75M4s8/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/k_JrU75M4s8/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'ElectronicsNotes',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/tgjBb2-TC7QS1Lni5-QDf_-Kl74"',
        id: {
          kind: 'youtube#video',
          videoId: 'mTH4pJ7l-xQ',
        },
        snippet: {
          publishedAt: '2020-01-20T23:16:49.000Z',
          channelId: 'UC12kz9piIU_xdyNCh_Xg5nQ',
          title:
            'yes politics ft. Bastiat, TheSerfsTV, Pxie, Ahrelevant, LCTRfan, Corin, &amp; OperationMadman - 1/19/20',
          description:
            '"yes politics" is a weekly round table hosted by imreallyimportant on Twitch. Watch live on Sundays @ 6 pm PST: https://www.twitch.tv/imreallyimportant. Links to ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/mTH4pJ7l-xQ/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/mTH4pJ7l-xQ/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/mTH4pJ7l-xQ/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'imreallyimportant',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/XtvDXuM_tDUwqxL1uIwGWQKYrh4"',
        id: {
          kind: 'youtube#video',
          videoId: 'u23w3lT4evQ',
        },
        snippet: {
          publishedAt: '2020-04-16T06:03:11.000Z',
          channelId: 'UCElwY-acQqH6zt4ko2FHc3Q',
          title:
            'Debating Pxie on &quot;Bernie or Bust&quot; or &quot;Vote Blue No Matter Who&quot;',
          description:
            'Discord Server: https://discord.gg/8q8k7ZN Patreon: https://www.patreon.com/theleftistlemon Twitter: https://twitter.com/TheLeftistLemon?lang=en Twitch: ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/u23w3lT4evQ/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/u23w3lT4evQ/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/u23w3lT4evQ/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'The Leftist Lemon',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/IJiuXZXqs0uhA4s0LTrvjCopl_U"',
        id: {
          kind: 'youtube#video',
          videoId: 'okh6MGj8va4',
        },
        snippet: {
          publishedAt: '2011-02-15T18:32:14.000Z',
          channelId: 'UCxIKdso89f-IvWbdSy7Cc7A',
          title: 'NI PXIe-5665 VSA Speed and Accuracy Comparison',
          description:
            'Visit http://bit.ly/cZ6Yex for more information. The new NI PXIe-5665 Vector Signal Analyzer offers industry-leading performance in both speed and accuracy.',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/okh6MGj8va4/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/okh6MGj8va4/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/okh6MGj8va4/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'niglobal',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/cGukZg0bNRQDJoOCI-JB0TnYKiI"',
        id: {
          kind: 'youtube#channel',
          channelId: 'UCOWOstRWtbbDhD4g5bkJ_sQ',
        },
        snippet: {
          publishedAt: '2019-09-22T12:20:21.000Z',
          channelId: 'UCOWOstRWtbbDhD4g5bkJ_sQ',
          title: 'Pxie',
          description: '',
          thumbnails: {
            default: {
              url:
                'https://yt3.ggpht.com/-2tPEnCS2jgA/AAAAAAAAAAI/AAAAAAAAAAA/XvLI0LBhmac/s88-c-k-no-mo-rj-c0xffffff/photo.jpg',
            },
            medium: {
              url:
                'https://yt3.ggpht.com/-2tPEnCS2jgA/AAAAAAAAAAI/AAAAAAAAAAA/XvLI0LBhmac/s240-c-k-no-mo-rj-c0xffffff/photo.jpg',
            },
            high: {
              url:
                'https://yt3.ggpht.com/-2tPEnCS2jgA/AAAAAAAAAAI/AAAAAAAAAAA/XvLI0LBhmac/s800-c-k-no-mo-rj-c0xffffff/photo.jpg',
            },
          },
          channelTitle: 'Pxie',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/x-PVmmoUbYrquVb-IAGDpTpocm4"',
        id: {
          kind: 'youtube#video',
          videoId: 'cqQg25DTriA',
        },
        snippet: {
          publishedAt: '2019-12-15T23:35:04.000Z',
          channelId: 'UCYkTZLUa-ai7Gr5u2ZYhx4g',
          title:
            'MindSeifers Podcast Episode 1 HYPE! w/ Mindwaves, Mastiat, Pxie, Aidanwould, MicroMacroTX, ScuffedLe',
          description:
            'Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/leonseifers.',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/cqQg25DTriA/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/cqQg25DTriA/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/cqQg25DTriA/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Leon Seifers',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/B2al8eyCbEqNMSY_f9YoIFnBTrM"',
        id: {
          kind: 'youtube#video',
          videoId: 'BjFNcKGhRz4',
        },
        snippet: {
          publishedAt: '2015-05-28T07:46:18.000Z',
          channelId: 'UCswOixzijdlEKTBG_ZEnkOw',
          title:
            '高速でフレキシブルなマルチチャネル信号発生と解析 M9381A PXIe VSG &amp; M9391A PXIe VSA',
          description:
            'ご紹介するのは、マルチチャネル位相コヒーレント信号を発生／解析する新しい手法です。 最新のマルチアンテナ手法を扱っているエンジニアの...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/BjFNcKGhRz4/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/BjFNcKGhRz4/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/BjFNcKGhRz4/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Keysight Asia',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/s1-2OLblaAraPyzVMDAVaBpS8Ks"',
        id: {
          kind: 'youtube#video',
          videoId: 'H70zpTqZzjQ',
        },
        snippet: {
          publishedAt: '2013-06-12T09:02:56.000Z',
          channelId: 'UCop5hhPkgoOu7lV5wiHJShQ',
          title: 'Benefits of PXI &amp; PXIe for industrial applications',
          description:
            'In this interactive video we discuss the PXI and PXI Express acrhitecture and the benefits of using these platforms in industrial applications.',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/H70zpTqZzjQ/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/H70zpTqZzjQ/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/H70zpTqZzjQ/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'AmpliconTV',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/DoXPtC02Ocwc0eRtTYPUBgTd9aw"',
        id: {
          kind: 'youtube#video',
          videoId: '-vB6YY36fDA',
        },
        snippet: {
          publishedAt: '2015-09-06T19:55:29.000Z',
          channelId: 'UCsOLIK6y5kWB-d2RKOW6uhw',
          title: 'Operation of NI PXIe-1062Q',
          description:
            'This video shows how a NI PXIe-1062Q with PXIe-8105 is connected and work. It covers power up, self-test, calibration, and power down sequences. Enjoy.',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/-vB6YY36fDA/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/-vB6YY36fDA/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/-vB6YY36fDA/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'T. Davis',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/CJhxvdHUvLanIWon-FFaKnkJg0Q"',
        id: {
          kind: 'youtube#video',
          videoId: '3ZRmU5dN258',
        },
        snippet: {
          publishedAt: '2020-04-09T21:50:13.000Z',
          channelId: 'UCJkbxZKFQbCANVCO1tHXWxQ',
          title: 'Astronics&#39; PXIe 6943 Digital Test Instrument Highlights',
          description: '',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/3ZRmU5dN258/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/3ZRmU5dN258/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/3ZRmU5dN258/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'Astronics Corporation',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/KLsuddiaAHN6qnhYLdMVAJBTxUI"',
        id: {
          kind: 'youtube#video',
          videoId: 'Y42krNfGTuk',
        },
        snippet: {
          publishedAt: '2019-06-20T20:54:28.000Z',
          channelId: 'UCZJU7OjoqVinvaoGPt0wDBw',
          title: 'Introduction of PXIe-S5090 at IMS 2019',
          description:
            'Alex Goloschokin (Copper Mountain Technologies) and Jason White (National Instruments) share details on the new PXIe-S5090 VNA that will be released in ...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/Y42krNfGTuk/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/Y42krNfGTuk/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/Y42krNfGTuk/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'CopperMountainTech',
          liveBroadcastContent: 'none',
        },
      },
      {
        kind: 'youtube#searchResult',
        etag: '"nxOHAKTVB7baOKsQgTtJIyGxcs8/xkIz4oTALPpmejzXKtW4-rwzRU4"',
        id: {
          kind: 'youtube#video',
          videoId: '4d-CxEcVmrI',
        },
        snippet: {
          publishedAt: '2013-03-09T14:12:00.000Z',
          channelId: 'UCvQ5AF7ldp99HZX3iyFuD-Q',
          title:
            '2013 MWC: National Instruments announces Vector Signal Transceiver NI PXIe-5645R',
          description:
            "Eric Johnson, National Instruments Product Manager, provides RCR Wireless News with an walking tour of NI's booth at Mobile World Congress 2013.",
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/4d-CxEcVmrI/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/4d-CxEcVmrI/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/4d-CxEcVmrI/hqdefault.jpg',
              width: 480,
              height: 360,
            },
          },
          channelTitle: 'RCR Wireless News',
          liveBroadcastContent: 'none',
        },
      },
    ],
  }.results;
  // return gapi.client.youtube.search
  //   .list({
  //     part: 'snippet',
  //     maxResults: 25,
  //     q: query,
  //   })
  //   .then(
  //     (response) => {
  //       return response.result.items;
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
