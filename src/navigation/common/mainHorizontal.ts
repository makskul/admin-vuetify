export default [
  {
    title: 'Galleries',
    to: 'galleries',
    icon: { icon: 'mdi-view-gallery-outline' },
  },
  {
    title: 'Categories',
    to: 'categories',
    icon: { icon: 'mdi-format-list-bulleted' },
  },
  {
    title: 'Pornstars',
    to: 'pornstars',
    icon: { icon: 'mdi-star-outline' },
  },
  {
    title: 'Channels',
    to: 'channels',
    icon: { icon: 'mdi-movie-open' },
  },
  {
    title: 'Studio(s)',
    to: 'studios',
    icon: { icon: 'mdi-theatre' },
  },
  {
    title: 'Sponsor',
    to: 'sponsor',
    icon: { icon: 'mdi-cash-multiple' },
  },
  {
    title: 'Tags',
    to: 'tags',
    icon: { icon: 'mdi-tag-multiple' },
  },
  {
    title: 'Pages',
    children: [
      {
        title: 'Site Configuration',
        to: 'settings',
        icon: { icon: 'mdi-cogs' },
      },
      {
        title: 'Advertising',
        to: 'spots',
        icon: { icon: 'mdi-advertisements' },
      },
      {
        title: 'Import Feed',
        to: 'feed',
        icon: { icon: 'mdi-import' },
      },
      {
        title: 'Redirects',
        to: 'redirects',
        icon: { icon: 'mdi-arrow' },
      },
      {
        title: 'Parsers',
        to: 'parsers',
        icon: { icon: 'mdi-lock-pattern' },
      }
    ],
  }
]
