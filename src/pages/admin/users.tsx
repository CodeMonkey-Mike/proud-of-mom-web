import React from 'react';
import styled from 'styled-components';
import { withApollo } from 'src/helper/apollo';
import { useQuery } from '@apollo/client';
import { USER_LIST } from '../../graphql/query/user.query';
import Loading from '../../components/Loading/Loading';

const HeadingTitle = styled.h2`
  padding: 20px;
`;

const TableWrapper = styled.div`
  display: table;
`;

const RowWrapper = styled.div`
  display: table-row;
`;

const CellWrapper = styled.div`
  display: table-cell;
  padding: 2px 20px;
`;

const Users = () => {
  const { loading, error, data } = useQuery(USER_LIST);

  if (loading) return <Loading text="Loading..." />;

  if (error) return <div>Error! ${error.message}</div>;

  return (
    <div>
      <HeadingTitle>User List</HeadingTitle>
      <TableWrapper>
        <RowWrapper>
          <CellWrapper>ID#</CellWrapper>
          <CellWrapper>Username</CellWrapper>
          <CellWrapper>Email</CellWrapper>
          <CellWrapper>Role ID</CellWrapper>
        </RowWrapper>
        {data.userList.map((user: any) => {
          return (
            <RowWrapper key={user.id}>
              <CellWrapper>{user.id}</CellWrapper>
              <CellWrapper>{user.username}</CellWrapper>
              <CellWrapper>{user.email}</CellWrapper>
              <CellWrapper>{user.role_id}</CellWrapper>
            </RowWrapper>
          );
        })}
      </TableWrapper>
    </div>
  );
};

export default withApollo(Users);
