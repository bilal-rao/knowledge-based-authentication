import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CustomScrollbars from "util/CustomScrollbars";
import Loader from "components/overlayLoader/spinner.js";
// import { product } from "constant/StaticData";

// Actions
import * as prAc from "actions/Product";

var timeStamp = 0;
class SidenavContent extends Component {
  constructor() {
    super();
    this.state = {
      // stages: product.stages,
      modules: []
    };
  }

  componentDidMount() {
    this.props.showProductMainPageLoader();
    this.props.searchProduct({
      code: localStorage.getItem("proCode"),
      pageNumber: 1,
      pageSize: 100
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.proL !== prevProps.proL) {
      if (this.props.proL) {
        this.filterNavigation();

        setTimeout(() => {
          var ain = document.getElementById("inner-navigation");
          var np = ain.getElementsByClassName("parent");
          var npi = ain.getElementsByClassName("parent-inner");
          var nc = ain.getElementsByClassName("child");

          for (var k = 0; k < nc.length; k++) {
            if (
              nc[k].getElementsByTagName("a")[0].classList.contains("active")
            ) {
              if (nc[k].closest(".parent-inner"))
                nc[k].closest(".parent-inner").classList.add("open");
              nc[k].closest(".parent").classList.add("open");
            }
            nc[k].addEventListener(
              "click",
              function(e) {
                this.classList.toggle("open");
                timeStamp = e.timeStamp;
              },
              false
            );

            if (npi[k]) {
              npi[k].addEventListener(
                "click",
                function(e) {
                  if (e.timeStamp !== timeStamp) {
                    var on = ain.getElementsByClassName("parent open")[0];
                    var oni = on.getElementsByClassName("parent-inner open");
                    if (oni.length > 0 && this !== oni[0]) {
                      oni[0].classList.remove("open");
                    }
                    this.classList.toggle("open");
                  }
                  timeStamp = e.timeStamp;
                },
                false
              );
            }

            if (np[k]) {
              np[k].addEventListener(
                "click",
                function(e) {
                  if (e.timeStamp !== timeStamp) {
                    var on = ain.getElementsByClassName("parent open");
                    if (on.length > 0 && this !== on[0]) {
                      var oni = on[0].getElementsByClassName(
                        "parent-inner open"
                      );
                      if (oni.length > 0) {
                        oni[0].classList.remove("open");
                      }
                      on[0].classList.toggle("open");
                    }
                    this.classList.toggle("open");
                  }
                  timeStamp = e.timeStamp;
                },
                false
              );
            }
          }
        }, 500);
      }
    }

    if (this.props.shMsg) {
      setTimeout(() => {
        this.props.hideProductMessage();
      }, 100);
    }
  }

  parent = (element, layer = "") => {
    return (
      <li
        name=""
        key={element.name}
        className={`menu collapse-box parent${layer}`}
      >
        <Button name="" href="javascript:void(0)">
          <span className="nav-text">{element.name}</span>
        </Button>
        <ul className="sub-menu">
          {element.modules.map((el, i) => {
            if (el.modules.length) {
              return this.parent(el, `-inner`);
            } else {
              return this.children(el, `-inner`);
            }
          })}
        </ul>
      </li>
    );
  };

  children = element => {
    return (
      <li name="" key={element.name} className="child">
        <NavLink className="prepend-icon" to={element.route}>
          <span className="nav-text">{element.name}</span>
        </NavLink>
      </li>
    );
  };

  renderNavigation = data => {
    if (data) {
      return data.map(element => {
        if (element.modules.length) {
          return this.parent(element);
        } else {
          return this.children(element);
        }
      });
    }
  };

  filterNavigation = () => {
    var modules = [];
    var exGrp = {};
    var basicURL = this.props.history.location.pathname.split("/");
    basicURL.pop();
    basicURL.pop();
    basicURL = basicURL.join("/");

    var product = this.props.proL[0];

    if (product) {
      for (let stg = 0; stg < product.stages.length; stg++) {
        modules = [
          ...modules,
          {
            name: product.stages[stg].name,
            modules: []
          }
        ];
        for (let fld = 0; fld < product.stages[stg].fields.length; fld++) {
          if (
            !exGrp[
              product.stages[stg].code + product.stages[stg].fields[fld].group
            ]
          ) {
            exGrp[
              product.stages[stg].code + product.stages[stg].fields[fld].group
            ] = true;
            modules[stg].modules = [
              ...modules[stg].modules,
              {
                name: product.stages[stg].fields[fld].group,
                route: `${basicURL}/step${stg + 1}/${product.stages[stg].fields[
                  fld
                ].group
                  .replace(/\s/g, "-")
                  .toLowerCase()}`,
                modules: []
              }
            ];
            
            if (product.stages[stg].fields[fld].subgroup) {
              modules[stg].modules[modules[stg].modules.length - 1].modules = [
                ...modules[stg].modules[modules[stg].modules.length - 1].modules,
                {
                  route: `${basicURL}/step${stg + 1}/${product.stages[
                    stg
                  ].fields[fld].subgroup
                    .replace(/\s/g, "-")
                    .toLowerCase()}`,
                  name: product.stages[stg].fields[fld].subgroup,
                  modules: []
                }
              ];
            }
          }
        }
      }
    }
    this.setState({
      modules: modules
    });
  };

  render() {
    return (
      <CustomScrollbars className="scrollbar" id="inner-navigation">
        <ul className="nav-menu">
          {this.renderNavigation(this.state.modules)}
        </ul>
      </CustomScrollbars>
    );
  }
}

function mapStateToProps(state) {
  return {
    proL: state.productsData.productsList
      ? state.productsData.productsList.data.items
      : "",
    shMsg: state.productsData.showMessage,
    altMsg: state.productsData.alertMessage,
    loader: state.productsData.loader
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      ...prAc
    }
  )(SidenavContent)
);
