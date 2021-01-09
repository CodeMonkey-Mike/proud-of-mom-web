import { withApollo } from 'src/helper/apollo';
import Home from './home';

const Admin = withApollo(Home);
export default Admin;
