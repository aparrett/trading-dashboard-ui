# Trading Dashboard
An app for analyzing financial trades. Click [here](https://d33q9sffuin3mg.cloudfront.net) to start.

### Features
- Overview
  - View statistics for the selected month
  - View the total P&L for each day of the selected month

- Trades
  - Import trades using JSON format
  - Import trades using CSV format (only supports TradeZero format currently)
  - View the statistics for the selected date range
  - View your imported trades for the selected date range
  - Delete selected trades
  
### TODO
- Better validation (hardly any exists at the moment for anything)
- Bugfix: the app doesn't work in mobile browsers
- Hover text on menu items
- Allow user to import a variety of broker formats
- Convert Import JSON to its own page and add helpful information
  - show schema
  - explain how condensed trades work
- Allow user to import JSON with custom properties
  - show schema
  - explain how condensed trades work
- Convert Import CSV to its own page and add helpful information
- Allow user to import CSV with custom headers
- Allow user to choose a timezone
- Allow user to view the details of a trade and show the chart
- Link from Overview page single day P&L to Trades page with the date range pre-selected
- Allow user to add notes to trades
- Allow user to tag trades
- Add "Are you sure?" prompt to delete btn
- Optimize display of open and close date and time in Trades table
- Update favicon
- Allow user to select their own neutral trade threshold. The default is $10.

### Tech

- React
- Typescript
- Apollo
- GraphQL
- Material UI
