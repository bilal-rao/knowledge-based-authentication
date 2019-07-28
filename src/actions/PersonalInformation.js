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
    DeleteIdentity,
  } from "../constants/ActionTypes";
  
  
  
  export const saveAddress = obj => {
    return {
      type: AddAddress,
      payload: obj
    };
  };
  
  export const editAddress = obj => {
    return {
      type: EditAddress,
      payload: obj
    }
  }
  export const deleteAddress = id => {
    return {
      type: DeleteAddress,
      payload: id
    }
  }
  export const saveContact = obj => {
    return {
      type: AddContact,
      payload: obj
    };
  };
  export const editContact = obj => {
    return {
      type: EditContact,
      payload: obj
    }
  }
  export const deleteContact = id => {
    return {
      type: DeleteContact,
      payload: id
    }
  }
  export const saveProperty = obj => {
    return {
      type: AddProperty,
      payload: obj
    };
  };

  export const editProperty = obj => {
    return {
      type: EditProperty,
      payload: obj
    }
  }
  export const deleteProperty = id => {
    return {
      type: DeleteProperty,
      payload: id
    }
  }
  export const saveMotorAssets = obj => {
    return {
      type: AddMotorAssets,
      payload: obj
    };
  };
  
  export const editMotorAssets = obj => {
    return {
      type: EditMotorAssets,
      payload: obj
    }
  }
  export const deleteMotorAssets = id => {
    return {
      type: DeleteMotorAssets,
      payload: id
    }
  }

  export const saveIdentity = obj => {
    return {
      type: AddIdentity,
      payload: obj
    };
  };
  
  export const editIdentity = obj => {
    return {
      type: EditIdentity,
      payload: obj
    }
  }
  export const deleteIdentity = id => {
    return {
      type: DeleteIdentity,
      payload: id
    }
  }