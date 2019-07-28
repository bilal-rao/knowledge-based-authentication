import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import ChatData from './Chat';
import Contact from './Contact';
import Mail from './Mail';
import ToDo from './ToDo';
import Auth from './Auth';
import Module from './Module';
import Action from './Action';
import User from './Employee';
import Group from './Group';
import Role from './Role';
import Hierarchy from './Hierarchy';
import Scrutinizer from './Scrutinizer';
import Department from './Department';
import Designation from './Designation';
import Bank from './Bank';
import LookUp from './LookUp';
import GenericComponent from './GenericComponent';
import PersonalInformation from './PersonalInformation';
import UserProfile from './UserProfile';
import QueryBuilder from './QueryBuilder';
import Product from './Product';
import Source from './Source';
import Deviation from './Deviation';
import MdmDiscrepencies from './MdmDiscrepencies';
import DocumentTypes from './DocumentTypes';
import Fields from './Fields';
import Discrepancies from './Discrepancies';

//Hackhathon
import Dominos from './Dominos';



// const appReducers = (history) => combineReducers({
//   router: connectRouter(history),
//   settings: Settings,
//   chatData: ChatData,
//   contacts: Contact,
//   mail: Mail,
//   toDo: ToDo,
//   auth: Auth,
//   usersData: User,
//   groupsData: Group,
//   rolesData: Role,
//   hierarchiesData: Hierarchy,
//   genericData: GenericComponent,
//   personalInformation: PersonalInformation,
//   userProfile: UserProfile,
//   modules: Module,
//   actions: Action,
//   scrutinizers: Scrutinizer,
//   departmentsData: Department,
//   designationsData: Designation,
//   banksData: Bank,
//   lookUpsData: LookUp,
//   QueryBuilderData: QueryBuilder,
//   productsData: Product,
//   sourceData: Source,
//   deviationData: Deviation,
//   mdmDiscrepenciesData: MdmDiscrepencies,
//   documentTypesData: DocumentTypes,
//   fieldsData: Fields
// });


// const reducers = (state, action) => {
//   if (action.type === 'signout_user_success') {
//       localStorage.removeItem('lookupId');        
//       localStorage.removeItem('lookupName');        
//       localStorage.removeItem('lookupPath');
//       localStorage.removeItem('moduleCode');
//       localStorage.removeItem('pendingModuleCode');
//       state = undefined
//   }
//   return appReducers(state, action)
// }

// export default reducers;


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  chatData: ChatData,
  contacts: Contact,
  mail: Mail,
  toDo: ToDo,
  auth: Auth,
  usersData: User,
  groupsData: Group,
  rolesData: Role,
  hierarchiesData: Hierarchy,
  genericData: GenericComponent,
  personalInformation: PersonalInformation,
  userProfile: UserProfile,
  modules: Module,
  actions: Action,
  scrutinizers: Scrutinizer,
  departmentsData: Department,
  designationsData: Designation,
  banksData: Bank,
  lookUpsData: LookUp,
  QueryBuilderData: QueryBuilder,
  productsData: Product,
  sourceData: Source,
  deviationData: Deviation,
  mdmDiscrepenciesData: MdmDiscrepencies,
  documentTypesData: DocumentTypes,
  fieldsData: Fields,
  discrepanciesData: Discrepancies,
  dominosData: Dominos
});
