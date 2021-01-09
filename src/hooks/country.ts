import { useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';
import { COUNTRY_LIST } from 'src/graphql/query/country.query';

interface ICountry {
  code: string;
  name: string;
}

export const useCountry = () => {
  const { data, loading: countryLoading, refetch } = useQuery(COUNTRY_LIST);

  const countries = useMemo(() => {
    if (data && data.countries) {
      return data.countries.map((item: ICountry) => {
        return {
          value: item.code,
          label: item.name,
        };
      });
    }
  }, [data]);
  const refetchCountry = useCallback(() => refetch(), [refetch]);
  return {
    countries,
    countryLoading,
    refetchCountry,
  };
};
