import { Like, ObjectLiteral, SelectQueryBuilder } from "typeorm";

export function searchField<T extends ObjectLiteral>(query: SelectQueryBuilder<T>, fieldName: string, searchValue?: string): SelectQueryBuilder<T> {
  const searchTerms: string[] | undefined = searchValue?.trim().split(/\s/);
  for (const i in searchTerms) {
    if (i == '0') {
      query = query.where({
        [fieldName]: Like(`%${searchTerms[i]}%`)
      })
    } else {
      query = query.orWhere({
        [fieldName]: Like(`%${searchTerms[i]}%`)
      })
    }
  }
  return query;
}
