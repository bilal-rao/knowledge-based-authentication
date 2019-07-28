import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomScrollbars from "util/CustomScrollbars";
import Loader from "../../components/overlayLoader/spinner.js";

var timeStamp = 0;
class SidenavContent extends Component {
  componentDidUpdate() {
    var asn = document.getElementById("main-navigation");
    var np = asn.getElementsByClassName("parent");
    var npi = asn.getElementsByClassName("parent-inner");
    var nc = asn.getElementsByClassName("child");

    for (var k = 0; k < nc.length; k++) {
      if(nc[k].getElementsByTagName('a')[0].classList.contains('active')){
        if(nc[k].closest('.parent-inner')) nc[k].closest('.parent-inner').classList.add('open');
        if(nc[k].closest('.parent')) nc[k].closest('.parent').classList.add('open');
      }
      nc[k].addEventListener(
        "click",
        function(e) {
          this.classList.toggle("open");
          localStorage.setItem("proName", this.getElementsByTagName('span')[0].innerText)
          timeStamp = e.timeStamp;
        },
        false
      );

      if (npi[k]) {
        npi[k].addEventListener(
          "click",
          function(e) {
            if (e.timeStamp !== timeStamp) {
              var on = asn.getElementsByClassName("parent open")[0];
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
              var on = asn.getElementsByClassName("parent open");
              if (on.length > 0 && this !== on[0]) {
                var oni = on[0].getElementsByClassName("parent-inner open");
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
  }

  parent = (element, layer = "") => {
    if (element.status === 0) {
      return (
        <li
          name=""
          key={element.moduleCode}
          className={`menu collapse-box parent${layer}`}
        >
          <Button name="" href="javascript:void(0)">
            <i className={element.icon === 'icon.png' || !element.icon ? "zmdi zmdi-accounts-list" : element.icon} />
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
    }
  };

  children = element => {
    if (element.status === 0) {
      return (
        <li name="" key={element.moduleCode} className="child">
          <NavLink className="prepend-icon" to={element.route}>
            <span className="nav-text">{element.name}</span>
          </NavLink>
        </li>
      );
    }
  };

  renderNavigation = data => {
    if (data) {
      return data.map(element => {
        if (element.modules.length && !element.route) {
          return this.parent(element);
        } else {
          return this.children(element);
        }
      });
    }
  };

  render() {
    return (
      <CustomScrollbars className="scrollbar" id="main-navigation">
        {this.props.modules.data ? (
          <ul className="nav-menu">
            {this.renderNavigation(this.props.modules.data.modules)}
          </ul>
        ) : (
          <ul className="nav-menu" style={{ paddingTop: "20px" }}>
            <Loader />
          </ul>
        )}
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
