import { Like, ObjectLiteral, SelectQueryBuilder } from 'typeorm'

export function searchField<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  fieldName: string,
  searchValue?: string,
): SelectQueryBuilder<T> {
  const searchTerms: string[] | undefined = searchValue?.trim().split(/\s/)
  if (searchTerms != null) {
    for (const term of searchTerms) {
      query = query.orWhere({
        [fieldName]: Like(`%${term}%`),
      })
    }
  }
  return query
}
