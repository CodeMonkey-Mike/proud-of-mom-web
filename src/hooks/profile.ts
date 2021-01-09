import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { UPDATE_PROFILE } from 'src/graphql/mutation/profile.mutation';

export const useProfile = () => {
  const [UpdateProfile, { data: profileData, loading: profileLoading }] = useMutation(
    UPDATE_PROFILE
  );
  const onUpdate = useCallback(
    async (values) => {
      console.log(values);
      await UpdateProfile({
        variables: {
          ...values,
        },
      });
    },
    [UpdateProfile]
  );
  return {
    onUpdate,
    profileLoading,
    profileData,
  };
};
