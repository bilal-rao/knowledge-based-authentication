import {all} from 'redux-saga/effects';
import authSagas from './Auth';
import employeeSagas from './Employee';
import groupSagas from './Group';
import roleSagas from './Role';
import hierarchySagas from './Hierarchy';
import ModuleSagas from './Module';
import ScrutinizerSagas from './Scrutinizer';
import DepartmentSagas from './Department';
import DesignationSagas from './Designation';
import BankSagas from './Bank';
import LookUpSagas from './LookUp';
import QueryBuilderSagas from './QueryBuilder';
import ProductSagas from './Product';
import SourceSagas from './Source';
import DeviationSagas from './Deviation';
import MdmDiscrepenciesSagas from './MdmDiscrepencies';
import DocumentTypeSagas from './DocumentTypes';
import FieldSagas from './Fields';
import DiscrepancySagas from './Discrepancies';

//Hackhathon
import DominoSagas from './Dominos';


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    employeeSagas(),
    groupSagas(),
    roleSagas(),
    hierarchySagas(),
    ModuleSagas(),
    ScrutinizerSagas(),
    DepartmentSagas(),
    DesignationSagas(),
    BankSagas(),
    LookUpSagas(),
    QueryBuilderSagas(),
    ProductSagas(),
    SourceSagas(),
    DeviationSagas(),
    MdmDiscrepenciesSagas(),
    DocumentTypeSagas(),
    FieldSagas(),
    DiscrepancySagas(),
    DominoSagas()
  ]);
}
