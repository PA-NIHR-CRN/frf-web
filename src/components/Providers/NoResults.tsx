import { List, ListItem } from '@/components/List/List'

export function NoResults() {
  return (
    <div className="govuk-!-margin-top-8 govuk-body">
      <h3 className="govuk-heading-l">There are no matching results.</h3>
      <p id="improve-search-results">Improve your search results by:</p>
      <List className="pl-6" aria-labelledby="improve-search-results">
        <ListItem>Removing filters</ListItem>
        <ListItem>Double-checking your spelling</ListItem>
        <ListItem>Using fewer keywords</ListItem>
        <ListItem>Searching for something less specific</ListItem>
      </List>
    </div>
  )
}
