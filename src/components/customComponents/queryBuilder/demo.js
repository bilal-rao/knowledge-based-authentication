import React, { Component } from "react";
import {
  queryBuilderFormat,
  queryString,
  mongodbFormat,
  Query,
  Builder,
  Preview,
  Utils
} from "../../../../src/containers/App.js";
// import config from "./config";
// import './css/reset.scss';
import "./css/styles.scss";
import "./css/compact_styles.scss";
// import './css/denormalize.scss';
import { showBuilderLoader, fetchAllFields } from "actions/QueryBuilder";
import { showFieldLoader, fetchIndividualField } from "actions/Fields";

import { connect } from "react-redux";
import {
  Widgets,
  Operators,
  TextWidget,
  NumberWidget,
  SliderWidget,
  RangeWidget,
  SelectWidget,
  MultiSelectWidget,
  DateWidget,
  BooleanWidget,
  TimeWidget,
  DateTimeWidget,
  ValueFieldWidget,
  ProximityOperator
} from "../../../../src/containers/App.js";
import moment from "moment";
import en_US from 'antd/lib/locale-provider/en_US';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import { fromJS } from "immutable";

var stringify = require("json-stringify-safe");

const Immutable = require("immutable");
const transit = require("transit-immutable-js");

// https://github.com/ukrbublik/react-awesome-query-builder/issues/69
var seriazlieAsImmutable = true;
var exp = '';

var serializeTree, loadTree, initValue;
if (!seriazlieAsImmutable) {
  serializeTree = function (tree) {
    return JSON.stringify(tree.toJS());
  };
  loadTree = function (serTree) {
    let tree = JSON.parse(serTree);
    return fromJS(tree, function (key, value) {
      let outValue;
      if (key == "value" && value.get(0) && value.get(0).toJS !== undefined)
        outValue = Immutable.List.of(value.get(0).toJS());
      else
        outValue = Immutable.Iterable.isIndexed(value)
          ? value.toList()
          : value.toOrderedMap();
      return outValue;
    });
  };
  initValue = '{"type":"group","id":"9a99988a-0123-4456-b89a-b1607f326fd8","children1":{"a98ab9b9-cdef-4012-b456-71607f326fd9":{"type":"rule","id":"a98ab9b9-cdef-4012-b456-71607f326fd9","properties":{"field":"multicolor","operator":"multiselect_equals","value":[["yellow","green"]],"valueSrc":["value"],"operatorOptions":null,"valueType":["multiselect"]},"path":["9a99988a-0123-4456-b89a-b1607f326fd8","a98ab9b9-cdef-4012-b456-71607f326fd9"]}},"properties":{"conjunction":"AND","not":false},"path":["9a99988a-0123-4456-b89a-b1607f326fd8"]}';
} else {
  serializeTree = transit.toJSON;
  loadTree = transit.fromJSON;
  initValue = '["~#iM",["type","group","id","9a99988a-0123-4456-b89a-b1607f326fd8","children1",["~#iOM",["a98ab9b9-cdef-4012-b456-71607f326fd9",["^0",["type","rule","id","a98ab9b9-cdef-4012-b456-71607f326fd9","properties",["^0",["field","multicolor","operator","multiselect_equals","value",["~#iL",[["yellow","green"]]],"valueSrc",["^2",["value"]],"operatorOptions",null,"valueType",["^2",["multiselect"]]]],"path",["^2",["9a99988a-0123-4456-b89a-b1607f326fd8","a98ab9b9-cdef-4012-b456-71607f326fd9"]]]]]],"properties",["^0",["conjunction","AND","not",false]],"path",["^2",["9a99988a-0123-4456-b89a-b1607f326fd8"]]]]';
}



var count = 0;


class DemoQueryBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: {
        conjunctions: {
          AND: {
            label: "And",
            mongoConj: "$and",
            reversedConj: "OR",
            formatConj: (children, conj, not, isForDisplay) => {
              return children.size > 1
                ? (not ? "NOT " : "") +
                "(" +
                children.join(" " + (isForDisplay ? "AND" : "&&") + " ") +
                ")"
                : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
            }
          },
          OR: {
            label: "Or",
            mongoConj: "$or",
            reversedConj: "AND",
            formatConj: (children, conj, not, isForDisplay) => {
              return children.size > 1
                ? (not ? "NOT " : "") +
                "(" +
                children.join(" " + (isForDisplay ? "OR" : "||") + " ") +
                ")"
                : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
            }
          }
        },
        fields: {},
        types: {
          text: {
            widgets: {
              text: {
                defaultOperator: "is_empty",
                operators: [
                  "equal",
                  "not_equal",
                  "is_empty",
                  "is_not_empty",
                  "proximity"
                ],
                widgetProps: {
                  formatValue: (val, fieldDef, wgtDef, isForDisplay) =>
                    JSON.stringify(val),
                  valueLabel: "Text",
                  valuePlaceholder: "Enter text"
                }
              },
              field: {
                operators: [
                  "equal",
                  "not_equal",
                  //note that unary ops will be excluded anyway, see getWidgetsForFieldOp()
                  //"is_empty",
                  //"is_not_empty",
                  "proximity"
                ]
              }
            }
          },
          number: {
            mainWidget: "number",
            valueSources: ["value", "field"],
            defaultOperator: "equal",
            widgets: {
              number: {
                operators: [
                  "equal",
                  "not_equal",
                  "less",
                  "less_or_equal",
                  "greater",
                  "greater_or_equal",
                  "between",
                  "not_between",
                  "is_empty",
                  "is_not_empty"
                ],
                widgetProps: {
                  valueLabel: "Number2",
                  valuePlaceholder: "Enter number2"
                }
              },
              slider: {
                operators: [
                  "equal",
                  "not_equal",
                  "less",
                  "less_or_equal",
                  "greater",
                  "greater_or_equal"
                ],
                widgetProps: {
                  valueLabel: "Slider",
                  valuePlaceholder: "Move slider",
                  customProps: {
                    width: "200px"
                  }
                }
              },
              rangeslider: {
                operators: ["range_between", "range_not_between"],
                widgetProps: {
                  valueLabel: "Range",
                  valuePlaceholder: "Select range",
                  customProps: {
                    width: "300px"
                  }
                }
              }
            }
          },
          date: {
            widgets: {
              date: {
                operators: [
                  "equal",
                  "not_equal",
                  "less",
                  "less_or_equal",
                  "greater",
                  "greater_or_equal",
                  "between",
                  "not_between",
                  "is_empty",
                  "is_not_empty"
                ]
              }
            }
          },
          time: {
            widgets: {
              time: {
                operators: [
                  "equal",
                  "not_equal",
                  "less",
                  "less_or_equal",
                  "greater",
                  "greater_or_equal",
                  "between",
                  "not_between",
                  "is_empty",
                  "is_not_empty"
                ]
              }
            }
          },
          datetime: {
            widgets: {
              datetime: {
                operators: [
                  "equal",
                  "not_equal",
                  "less",
                  "less_or_equal",
                  "greater",
                  "greater_or_equal",
                  "between",
                  "not_between",
                  "is_empty",
                  "is_not_empty"
                ],
                opProps: {
                  between: {
                    valueLabels: [
                      { label: "Date from", placeholder: "Enrer datetime from" },
                      { label: "Date to", placeholder: "Enter datetime to" }
                    ]
                  }
                },
                widgetProps: {
                  timeFormat: "HH:mm",
                  dateFormat: "YYYY-MM-DD",
                  valueFormat: "YYYY-MM-DD HH:mm"
                }
              }
            }
          },
          select: {
            mainWidget: "select",
            widgets: {
              select: {
                operators: ["select_equals", "select_not_equals"],
                widgetProps: {
                  customProps: {
                    showSearch: true
                  }
                }
              },
              multiselect: {
                operators: ["select_any_in", "select_not_any_in"],
                widgetProps: {}
              }
            }
          },
          multiselect: {
            widgets: {
              multiselect: {
                operators: ["multiselect_equals", "multiselect_not_equals"]
              }
            }
          },
          boolean: {
            widgets: {
              boolean: {
                operators: ["equal"],
                widgetProps: {
                  //you can enable this if you don't use fields as value sources
                  //hideOperator: true,
                  //operatorInlineLabel: "is",
                }
              },
              field: {
                operators: ["equal", "not_equal"]
              }
            }
          }
        },
        operators: {
          equal: {
            label: "==",
            labelForFormat: "==",
            reversedOp: "not_equal",
            mongoFormatOp: (field, op, value) => ({ [field]: { $eq: value } })
          },
          not_equal: {
            label: "!=",
            labelForFormat: "!=",
            reversedOp: "equal",
            mongoFormatOp: (field, op, value) => ({ [field]: { $ne: value } })
          },
          less: {
            label: "<",
            labelForFormat: "<",
            reversedOp: "greater_or_equal",
            mongoFormatOp: (field, op, value) => ({ [field]: { $lt: value } })
          },
          less_or_equal: {
            label: "<=",
            labelForFormat: "<=",
            reversedOp: "greater",
            mongoFormatOp: (field, op, value) => ({ [field]: { $lte: value } })
          },
          greater: {
            label: ">",
            labelForFormat: ">",
            reversedOp: "less_or_equal",
            mongoFormatOp: (field, op, value) => ({ [field]: { $gt: value } })
          },
          greater_or_equal: {
            label: ">=",
            labelForFormat: ">=",
            reversedOp: "less",
            mongoFormatOp: (field, op, value) => ({ [field]: { $gte: value } })
          },
          between: {
            label: "Between",
            labelForFormat: "BETWEEN",
            cardinality: 2,
            formatOp: (
              field,
              op,
              values,
              valueSrcs,
              valueTypes,
              opDef,
              operatorOptions,
              isForDisplay
            ) => {
              let valFrom = values.first();
              let valTo = values.get(1);
              if (isForDisplay)
                return `${field} >= ${valFrom} AND ${field} <= ${valTo}`;
              else return `${field} >= ${valFrom} && ${field} <= ${valTo}`;
            },
            mongoFormatOp: (field, op, values) => ({
              [field]: { $gte: values[0], $lte: values[1] }
            }),
            valueLabels: ["Value from", "Value to"],
            textSeparators: [null, "and"],
            reversedOp: "not_between"
          },
          not_between: {
            label: "Not between",
            labelForFormat: "NOT BETWEEN",
            cardinality: 2,
            mongoFormatOp: (field, op, values) => ({
              [field]: { $not: { $gte: values[0], $lte: values[1] } }
            }),
            valueLabels: ["Value from", "Value to"],
            textSeparators: [null, "and"],
            reversedOp: "between"
          },
          range_between: {
            label: "Between",
            labelForFormat: "BETWEEN",
            cardinality: 2,
            isSpecialRange: true, // to show 1 range widget instead of 2
            formatOp: (
              field,
              op,
              values,
              valueSrcs,
              valueTypes,
              opDef,
              operatorOptions,
              isForDisplay
            ) => {
              let valFrom = values.first();
              let valTo = values.get(1);
              if (isForDisplay)
                return `${field} >= ${valFrom} AND ${field} <= ${valTo}`;
              else return `${field} >= ${valFrom} && ${field} <= ${valTo}`;
            },
            mongoFormatOp: (field, op, values) => ({
              [field]: { $gte: values[0], $lte: values[1] }
            }),
            valueLabels: ["Value from", "Value to"],
            textSeparators: [null, "and"],
            reversedOp: "range_not_between"
          },
          range_not_between: {
            label: "Not between",
            labelForFormat: "NOT BETWEEN",
            cardinality: 2,
            isSpecialRange: true, // to show 1 range widget instead of 2
            mongoFormatOp: (field, op, values) => ({
              [field]: { $not: { $gte: values[0], $lte: values[1] } }
            }),
            valueLabels: ["Value from", "Value to"],
            textSeparators: [null, "and"],
            reversedOp: "range_between"
          },
          is_empty: {
            isUnary: true,
            label: "Is Empty",
            labelForFormat: "IS EMPTY",
            cardinality: 0,
            reversedOp: "is_not_empty",
            formatOp: (
              field,
              op,
              value,
              valueSrc,
              valueType,
              opDef,
              operatorOptions,
              isForDisplay
            ) => {
              return isForDisplay ? `${field} IS EMPTY` : `!${field}`;
            },
            mongoFormatOp: (field, op) => ({ [field]: { $exists: false } })
          },
          is_not_empty: {
            isUnary: true,
            label: "Is not empty",
            labelForFormat: "IS NOT EMPTY",
            cardinality: 0,
            reversedOp: "is_empty",
            formatOp: (
              field,
              op,
              value,
              valueSrc,
              valueType,
              opDef,
              operatorOptions,
              isForDisplay
            ) => {
              return isForDisplay ? `${field} IS NOT EMPTY` : `!!${field}`;
            },
            mongoFormatOp: (field, op) => ({ [field]: { $exists: true } })
          },
          select_equals: {
            label: "==",
            labelForFormat: "==",
            formatOp: (
              field,
              op,
              value,
              valueSrc,
              valueType,
              opDef,
              operatorOptions,
              isForDisplay
            ) => {
              return `${field} == ${value}`;
            },
            mongoFormatOp: (field, op, value) => ({ [field]: { $eq: value } }),
            reversedOp: "select_not_equals"
          },
          select_not_equals: {
            label: "!=",
            labelForFormat: "!=",
            formatOp: (
              field,
              op,
              value,
              valueSrc,
              valueType,
              opDef,
              operatorOptions,
              isForDisplay
            ) => {
              return `${field} != ${value}`;
            },
            mongoFormatOp: (field, op, value) => ({ [field]: { $ne: value } }),
            reversedOp: "select_equals"
          },
          select_any_in: {
            label: "Any in",
            labelForFormat: "IN",
            formatOp: (
              field,
              op,
              values,
              valueSrc,
              valueType,
              opDef,
              operatorOptions,
              isForDisplay
            ) => {
              if (valueSrc == "value") return `${field} IN (${values.join(", ")})`;
              else return `${field} IN (${values})`;
            },
            mongoFormatOp: (field, op, values) => ({ [field]: { $in: values } }),
            reversedOp: "select_not_any_in"
          },
          select_not_any_in: {
            label: "Not in",
            labelForFormat: "NOT IN",
            formatOp: (
              field,
              op,
              values,
              valueSrc,
              valueType,
              opDef,
              operatorOptions,
              isForDisplay
            ) => {
              if (valueSrc == "value")
                return `${field} NOT IN (${values.join(", ")})`;
              else return `${field} NOT IN (${values})`;
            },
            mongoFormatOp: (field, op, values) => ({ [field]: { $nin: values } }),
            reversedOp: "select_any_in"
          },
          multiselect_equals: {
            label: "Equals",
            labelForFormat: "==",
            formatOp: (
              field,
              op,
              values,
              valueSrc,
              valueType,
              opDef,
              operatorOptions,
              isForDisplay
            ) => {
              if (valueSrc == "value") return `${field} == [${values.join(", ")}]`;
              else return `${field} == ${values}`;
            },
            mongoFormatOp: (field, op, values) => ({ [field]: { $eq: values } }),
            reversedOp: "multiselect_not_equals"
          },
          multiselect_not_equals: {
            label: "Not equals",
            labelForFormat: "!=",
            formatOp: (
              field,
              op,
              values,
              valueSrc,
              valueType,
              opDef,
              operatorOptions,
              isForDisplay
            ) => {
              if (valueSrc == "value") return `${field} != [${values.join(", ")}]`;
              else return `${field} != ${values}`;
            },
            mongoFormatOp: (field, op, values) => ({ [field]: { $ne: values } }),
            reversedOp: "multiselect_equals"
          },
          proximity: {
            label: "Proximity search",
            cardinality: 2,
            valueLabels: [
              { label: "Word 1", placeholder: "Enter first word" },
              "Word 2"
            ],
            textSeparators: [
              //'Word 1',
              //'Word 2'
            ],
            formatOp: (
              field,
              op,
              values,
              valueSrc,
              valueType,
              opDef,
              operatorOptions,
              isForDisplay
            ) => {
              let val1 = values.first();
              let val2 = values.get(1);
              return `${field} ${val1} NEAR/${operatorOptions.get(
                "proximity"
              )} ${val2}`;
            },
            mongoFormatOp: (field, op, values) => undefined,
            options: {
              optionLabel: "Near",
              optionTextBefore: "Near",
              optionPlaceholder: "Select words between",
              factory: props => <ProximityOperator {...props} />,
              defaults: {
                proximity: 2
              }
            }
          }
        },
        widgets: {
          text: {
            type: "text",
            valueSrc: "value",
            factory: props => <TextWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
              return isForDisplay ? '"' + val + '"' : JSON.stringify(val);
            },
            validateValue: (val, fieldDef) => {
              return val != "test";
            }
          },
          number: {
            type: "number",
            valueSrc: "value",
            factory: props => <NumberWidget {...props} />,
            valueLabel: "Number",
            valuePlaceholder: "Enter number",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
              return isForDisplay ? val : JSON.stringify(val);
            }
            //mongoFormatValue: (val, fieldDef, wgtDef) => (Number(val)),
          },
          slider: {
            type: "number",
            valueSrc: "value",
            factory: props => <SliderWidget {...props} />,
            valueLabel: "Slider",
            valuePlaceholder: "Move Slider",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
              return isForDisplay ? val : JSON.stringify(val);
            },
            customProps: {
              width: "300px"
            }
          },
          rangeslider: {
            type: "number",
            valueSrc: "value",
            factory: props => <RangeWidget {...props} />,
            valueLabel: "Range",
            valuePlaceholder: "Select Range",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
              return isForDisplay ? val : JSON.stringify(val);
            },
            customProps: {
              width: "300px"
            },
            singleWidget: "slider",
            valueLabels: ["Value from", "Value to"],
            textSeparators: [null, "and"]
          },
          select: {
            type: "select",
            valueSrc: "value",
            factory: props => <SelectWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
              let valLabel = fieldDef.listValues[val];
              return isForDisplay ? '"' + valLabel + '"' : JSON.stringify(val);
            }
          },
          multiselect: {
            type: "multiselect",
            valueSrc: "value",
            factory: props => <MultiSelectWidget {...props} />,
            formatValue: (vals, fieldDef, wgtDef, isForDisplay) => {
              let valsLabels = vals.map(v => fieldDef.listValues[v]);
              return isForDisplay
                ? valsLabels.map(v => '"' + v + '"')
                : vals.map(v => JSON.stringify(v));
            }
          },
          date: {
            type: "date",
            valueSrc: "value",
            factory: props => <DateWidget {...props} />,
            dateFormat: "DD.MM.YYYY",
            valueFormat: "YYYY-MM-DD",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
              let dateVal = moment(val, wgtDef.valueFormat);
              return isForDisplay
                ? '"' + dateVal.format(wgtDef.dateFormat) + '"'
                : JSON.stringify(val);
            }
          },
          time: {
            type: "time",
            valueSrc: "value",
            factory: props => <TimeWidget {...props} />,
            timeFormat: "HH:mm",
            valueFormat: "HH:mm:ss",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
              let dateVal = moment(val, wgtDef.valueFormat);
              return isForDisplay
                ? '"' + dateVal.format(wgtDef.timeFormat) + '"'
                : JSON.stringify(val);
            }
          },
          datetime: {
            type: "datetime",
            valueSrc: "value",
            factory: props => <DateTimeWidget {...props} />,
            timeFormat: "HH:mm",
            dateFormat: "DD.MM.YYYY",
            valueFormat: "YYYY-MM-DD HH:mm:ss",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
              let dateVal = moment(val, wgtDef.valueFormat);
              return isForDisplay
                ? '"' +
                dateVal.format(wgtDef.dateFormat + " " + wgtDef.timeFormat) +
                '"'
                : JSON.stringify(val);
            }
          },
          boolean: {
            type: "boolean",
            valueSrc: "value",
            factory: props => <BooleanWidget {...props} />,
            labelYes: "Yes",
            labelNo: "No ",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
              return isForDisplay ? (val ? "Yes" : "No") : JSON.stringify(!!val);
            },
            defaultValue: false
          },
          field: {
            valueSrc: "field",
            factory: props => <ValueFieldWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay, valFieldDef) => {
              return isForDisplay ? valFieldDef.label || val : val;
            },
            valueLabel: "Field to compare",
            valuePlaceholder: "Select field to compare",
            customProps: {
              showSearch: true
            }
          }
        },
        settings: {
          locale: {
            short: "en",
            full: "en-US",
            antd: en_US
          },
          maxLabelsLength: 50,
          hideConjForOne: true,
          renderSize: "small",
          renderConjsAsRadios: false,
          renderFieldAndOpAsDropdown: false,
          customFieldSelectProps: {
            showSearch: true
          },
          groupActionsPosition: "topRight", // oneOf [topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight]
          setOpOnChangeField: ["keep", "default"], // 'default' (default if present), 'keep' (keep prev from last field), 'first', 'none'
          clearValueOnChangeField: false, //false - if prev & next fields have same type (widget), keep
          clearValueOnChangeOp: false,
          setDefaultFieldAndOp: false,
          maxNesting: 10,
          fieldSeparator: ".",
          fieldSeparatorDisplay: "->",
          showLabels: false,
          valueLabel: "Value",
          valuePlaceholder: "Value",
          fieldLabel: "Field",
          operatorLabel: "Operator",
          fieldPlaceholder: "Select field",
          operatorPlaceholder: "Select operator",
          deleteLabel: null,
          addGroupLabel: "Add group",
          addRuleLabel: "Add rule",
          readonlyMode: false,
          notLabel: "Not",
          showNot: true,
          delGroupLabel: null,
          canLeaveEmptyGroup: true, //after deletion
          formatReverse: (
            q,
            operator,
            reversedOp,
            operatorDefinition,
            revOperatorDefinition,
            isForDisplay
          ) => {
            if (isForDisplay) return "NOT(" + q + ")";
            else return "!(" + q + ")";
          },
          formatField: (
            field,
            parts,
            label2,
            fieldDefinition,
            config,
            isForDisplay
          ) => {
            if (isForDisplay) return label2;
            else return field;
          },
          valueSourcesInfo: {
            value: {
              label: "Value"
            },
            //value or field choice comment when selecting dropdown

            // field: {
            //   label: "Field",
            //   widget: "field"
            // }
          },
          valueSourcesPopupTitle: "Select value source",
          canReorder: true,
          canCompareFieldWithField: (
            leftField,
            leftFieldConfig,
            rightField,
            rightFieldConfig
          ) => {
            //for type == 'select'/'multiselect' you can check listValues
            return true;
          }
        }
      },
      string: "",
      expression: "",
      dynamicFields: [],
      fieldData: [],
      allFields: [],
      render: false
    }
  }

  componentWillMount() {
    count = 0;
    exp = '';
    this.setState({ expression: this.props.expression ? this.props.expression : '' })
  }

  componentDidMount() {
    this.props.showBuilderLoader();
    this.props.fetchAllFields();
  }

  filterFieldParams = (fields) => {
    for (let fl = 0; fl < fields.length; fl++) {
      if (fields[fl].dataType === 2) {
        this.props.showFieldLoader();
        this.props.fetchIndividualField({ Id: fields[fl].id });
        count++;
      }
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fields && nextProps.fields !== this.props.fields) {
      this.setState({ allFields: nextProps.fields })
      this.filterFieldParams(nextProps.fields)
    }

    if (nextProps.iFD && nextProps.iFD !== this.props.iFD) {
      var tempArr = this.state.fieldData.concat(nextProps.iFD);
      this.setState({
        fieldData: tempArr
      }, () => {
        if (this.state.fieldData.length === count) {
          this.getFields(this.state.fieldData)
        }
      })
    }


  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.allFields !== prevState.allFields) {
      this.fieldMapping();
    }
  }

  getPredefinedField = (pF) => {
    let result = {};
    for (var i = 0; i < pF.length; i++) {
      result[pF[i].name] = pF[i].name;
    }
    return result;
  }

  fieldMapping = () => {
    var dynamicFields = {};
    const { allFields } = this.state;
    for (let fl = 0; fl < allFields.length; fl++) {
      if (allFields[fl].dataType === 2) {
        dynamicFields[`${allFields[fl].id}-${allFields[fl].name}`] = {
          label: allFields[fl].name,
          type: allFields[fl].type ? allFields[fl].type == 'string' ? 'text' : allFields[fl].dataType === 2 ? 'select' : allFields[fl].type : 'text',
          operators: [
            'select_equals',
            'select_not_equals'
          ],
          listValues: this.getPredefinedField(allFields[fl].predefinedFields),
        }
      }
      else {
        dynamicFields[`${allFields[fl].id}-${allFields[fl].name}`] = {
          label: allFields[fl].name,
          type: allFields[fl].type ? allFields[fl].type == 'string' ? 'text' : allFields[fl].dataType === 2 ? 'select' : allFields[fl].type : 'text',
          operators: ["equal", "not_equal"],
        }
      }
    }
    this.setState({
      config: {
        ...this.state.config,
        fields: { ...dynamicFields }
      },
      render: true
    })

  }
  getFields = (pF) => {
    const { allFields } = this.state;
    if (pF.length && allFields.length) {
      for (let f = 0; f < allFields.length; f++) {
        for (let p = f; p < pF.length; p++) {
          if (
            allFields[f].id === pF[p].id
          ) {
            this.setState({
              allFields: [
                ...allFields,
                {
                  ...allFields[f],
                  predefinedFields: pF[p].predefinedFields
                }
              ]
            });
          }
        }
      }
    }
  }
  getChildren(props) {
    const jsonStyle = {
      backgroundColor: "darkgrey",
      margin: "10px",
      padding: "10px"
    };
    return (
      <div style={{ padding: "10px" }}>
        <div className="query-builder">
          <Builder {...props} />
        </div>
        <br />
        <div>
          Condition:
          <pre style={jsonStyle}>
            {stringify(queryString(props.tree, props.config), undefined, 2)}
          </pre>
        </div>
      </div>
    );
  }

  onChange(tree) {
    this.props.onChange({
      expression: queryString(tree, this.state.config),
      expressionTree: serializeTree(tree, this.state.config)
    });
  }

  render() {
    const { tree, ...config_props } = this.state.config;
    if (this.props.expressionTree) {
      if (exp.length <= (this.props.expressionTree).length) {
        exp = this.props.expressionTree;
        initValue = loadTree(this.props.expressionTree);
      }
      return (
        <div>
          {this.state.config !== "" && !this.props.loader && this.state.render ?
            <div style={{ width: '-webkit-fill-available' }}>
              <Query
                value={initValue}
                {...config_props}
                get_children={this.getChildren}
                onChange={this.onChange.bind(this)}
              ></Query>
            </div> : null
          }
        </div>
      );
    }
    else {
      return (
        <div>
          {this.state.config !== "" && !this.props.loader && this.state.render ?
            <div style={{ width: '-webkit-fill-available' }}>
              <Query
                {...config_props}
                get_children={this.getChildren}
                onChange={this.onChange.bind(this)}
              ></Query>
            </div> : null
          }
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loader: state.QueryBuilderData.loader,
    fields: state.QueryBuilderData ? state.QueryBuilderData.fieldList.items : [],
    iFD: state.fieldsData.individualFieldData ? state.fieldsData.individualFieldData.data : []
  };
}

export default connect(mapStateToProps, {
  showBuilderLoader,
  fetchAllFields,
  showFieldLoader,
  fetchIndividualField
})(DemoQueryBuilder);
