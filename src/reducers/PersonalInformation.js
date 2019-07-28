import {
  AddAddress,
  EditAddress,
  DeleteAddress,
  AddContact,
  EditContact,
  DeleteContact,
  AddProperty,
  EditProperty,
  DeleteProperty,
  AddMotorAssets,
  EditMotorAssets,
  DeleteMotorAssets,
  AddIdentity,
  EditIdentity,
  DeleteIdentity
} from "../constants/ActionTypes";

const INIT_STATE = {
  address: "",
  contact: "",
  property: "",
  motorAssets: "",
  identity: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case AddAddress: {
      return {
        ...state,
        address: [...state.address, action.payload]
      };
    }
    case EditAddress: {
      const getAllAddresses = [...state.address];
      const editedData = getAllAddresses.map(data => {
        if (data.id === action.payload.id) {
          data = action.payload;
          return data;
        }
        return data;
      });
      return {
        ...state,
        address: editedData
      };
    }
    case DeleteAddress: {
      let removed;
      let getAllAddresses = [...state.address];
      removed = getAllAddresses.filter(function(obj) {
        return obj.id !== action.payload;
      });
      return {
        ...state,
        address: removed
      };
    }
    case AddContact: {
      return {
        ...state,
        contact: [...state.contact, action.payload]
      };
    }
    case EditContact: {
      const getAllContacts = [...state.contact];
      const editedData = getAllContacts.map(data => {
        if (data.id === action.payload.id) {
          data = action.payload;
          return data;
        }
        return data;
      });
      return {
        ...state,
        contact: editedData
      };
    }
    case DeleteContact: {
      let removed;
      let getAllContacts = [...state.contact];
      removed = getAllContacts.filter(function(obj) {
        return obj.id !== action.payload;
      });
      return {
        ...state,
        contact: removed
      };
    }
    case AddProperty: {
      return {
        ...state,
        property: [...state.property, action.payload]
      };
    }
    case EditProperty: {
      const getAllProperty = [...state.property];
      const editedData = getAllProperty.map(data => {
        if (data.id === action.payload.id) {
          data = action.payload;
          return data;
        }
        return data;
      });
      return {
        ...state,
        property: editedData
      };
    }
    case DeleteProperty: {
      let removed;
      let getAllPropertyes = [...state.property];
      removed = getAllPropertyes.filter(function(obj) {
        return obj.id !== action.payload;
      });
      return {
        ...state,
        property: removed
      };
    }
    case AddMotorAssets: {
      return {
        ...state,
        motorAssets: [...state.motorAssets, action.payload]
      };
    }
    case EditMotorAssets: {
      const getAllMotorAssets = [...state.motorAssets];
      const editedData = getAllMotorAssets.map(data => {
        if (data.id === action.payload.id) {
          data = action.payload;
          return data;
        }
        return data;
      });
      return {
        ...state,
        motorAssets: editedData
      };
    }
    case DeleteMotorAssets: {
      let removed;
      let getAllMotorAssets = [...state.motorAssets];
      removed = getAllMotorAssets.filter(function(obj) {
        return obj.id !== action.payload;
      });
      return {
        ...state,
        motorAssets: removed
      };
    }
    case AddIdentity: {
      return {
        ...state,
        identity: [...state.identity, action.payload]
      };
    }
    case EditIdentity: {
      const getAllIdentity = [...state.identity];
      const editedData = getAllIdentity.map(data => {
        if (data.id === action.payload.id) {
          data = action.payload;
          return data;
        }
        return data;
      });
      return {
        ...state,
        identity: editedData
      };
    }
    case DeleteIdentity: {
      let removed;
      let getAllIdentity = [...state.identity];
      removed = getAllIdentity.filter(function(obj) {
        return obj.id !== action.payload;
      });
      return {
        ...state,
        identity: removed
      };
    }
    default:
      return state;
  }
};
