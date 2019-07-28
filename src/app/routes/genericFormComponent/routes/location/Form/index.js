import React from "react";
import CardBox from "components/CardBox/index";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Cached from "@material-ui/icons/Cached";
import Geocode from "react-geocode";

class GenericForm extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      lat: '',
      long: ''
    }
  }
    componentDidMount(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
          this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude
          })
          Geocode.fromLatLng(
            position.coords.latitude,
            position.coords.longitude
          ).then(
            response => {
              const address = response.results[0].formatted_address;
              if (address) {
                  this.setState({
                    content: address
                  })
                }
            },
            error => {
              console.error(error);
            }
          );
        })
      }
    }
  clicForReload(){
    navigator.geolocation.getCurrentPosition((position)=>{
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude
      })
      Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude
      ).then(
        response => {
          const address = response.results[0].formatted_address;
          if (address) {
              this.setState({
                content: address
              })
            }
        },
        error => {
          console.error(error);
        }
      );
    })
  }
  render() {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="row">
          <CardBox
            styleName="col-lg-12"
            //   heading={<IntlMessages id="component.searchBar.searchUser" />}
          >
            <div className="row">
              <div className="col-md-12 col-12">
                <FormControl className="mb-12" fullWidth>
                  <Input name=""
                    id="location"
                    value={this.state.content ? this.state.content : 'loading...'}
                    disabled
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton name=""
                        onClick={this.clicForReload.bind(this)}
                        // onMouseDown={this.handleMouseDownPassword}
                        >
                          <Cached />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </div>
          </CardBox>
        </div>
      </div>
    );
  }
}

export default GenericForm;