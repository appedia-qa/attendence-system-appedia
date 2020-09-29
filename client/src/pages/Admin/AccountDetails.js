import React, { Component, Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Col } from "react-flexbox-grid";
import { ReactComponent as ProfileIcon } from "../../assets/icons/bxs-user-circle.svg";
import { useSelector } from "react-redux";
import UserInfo from "./userInfo";
import LoaderComponent from "../../components/LoaderComponent";
import ProductDialog from "../../components/UserInfoEdit";
import UserEditDialog from "../../components/EditUserPersonalDetail";
import { apiUrl } from "../../constants/urls";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import axios from "axios";

const AccountSection = styled.div`
  height: 500px;
  overflow-y: scroll;
  ${({ theme, width }) => `
  SVG {
    margin-top: 17px;
    margin-left: 20px;
    margin-right: 20px;
    height: 55px;
    width: 55px;
  }
  .add-address {
    margin-top: 30px;
    height: 49px;
    width: 174px;
    background-color: ${theme.palette.secondary.main};
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
  }
`}
`;

const AddressSection = styled(Col)`
  ${({ theme, width }) => `
  border: 1px solid #97979724;
  .profile-icon {
    ${width < 576 ? `display: none;` : `display: block;`}
  }   
 }
`}
`;

const NameSection = styled.div`
  margin-left: 1.5%;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;

const PhoneSection = styled.div`
  margin-left: 33%;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const EmailSection = styled.div`
  margin-left: 1.5%;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const CitySection = styled(Col)`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;

const StreetSection = styled(Col)`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const AddressUserSection = styled(Col)`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const BuildingSection = styled(Col)`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const AreaSection = styled(Col)`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const DetailTop = styled(Col)`
  ${({ theme, width }) => `
  border-bottom: 1px solid #97979724; 
  margin-left: 15%;
  margin-right: 5%;
  padding-bottom: 5px;
  ${width < 576 ? `margin-top: 0px;` : `margin-top: -74px;`}
  .top-heading {
      display: flex;
      justify-content: space-between;
  h1 {
    margin-bottom: 0px;
    font-size: 22px;
    font-weight: 500;
    color: #002040;
  }
  h2 {
      font-size: 14px;
      font-weight: 400;
      color: #0355F9;
      text-decoration: underline;
      cursor: pointer;
    }
  } 
`}
`;

const DetailBottom = styled(Col)`
  padding-left: 15%;
  padding-right: 15%;
  padding-bottom: 5px;
  display: flex;

  flex-direction: column;
  .top-heading {
    display: flex;
    justify-content: space-between;
    h1 {
      margin-bottom: 0px;
      font-size: 22px;
      font-weight: 500;
      color: #002040;
    }
    h2 {
      font-size: 14px;
      font-weight: 400;
      color: #0355f9;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const RowContainer = styled(Row)`
  justify-content: space-between;
`;
const ShipiingAddress = styled.div``;

const dummyUsers = {
  user_addresses: [
    {
      id: 1,
      user_id: 10,
      shipping_fullname: "Joun",
      shipping_address: "House # 29, Street # 7, Quaid-e-Azam Street",
      shipping_city: "Lahore",
      shipping_state: "Punjab",
      shipping_zipcode: "54780",
      shipping_phone: "+923024204613",
      house_number: "25",
    },
    {
      id: 2,
      user_id: 10,
      shipping_fullname: "umar",
      shipping_address: "House # 29, Street # 7, Quaid-e-Azam Street",
      shipping_city: "Lahore",
      shipping_state: "Punjab",
      shipping_zipcode: "54780",
      shipping_phone: "+923024204613",
      house_number: "25",
    },
  ],
};

const AccountDetails = (props) => {
  let user = null;
  const authentication = useSelector((state) => state.authentication);
  user = authentication.user;
  const [shopDialogOpen, setShopDialogOpen] = useState(false);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [editUser, setEditUser] = useState();
  const [userAddress, setUserAddress] = useState(dummyUsers.user_addresses);
  const [loadState, setLoadState] = useState(true);

  const fetchALLUser = async () => {
    if (user && user.id) {
      let url = apiUrl + `/address/all`;
      if (!url) return;
      let bodyParams = {};
      setLoadState(true);
      bodyParams = { ...bodyParams, user_id: user.id };
      const responce = await axios.get(url, { params: bodyParams });
      if (responce && responce.data) {
        setUserAddress(responce.data.user_addresses);
        setLoadState(false);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user && user.id) {
      fetchALLUser();
    }
  }, []);

  const handleProductDialogClose = () => {
    fetchALLUser();
    setShopDialogOpen(false);
    setAddNewAddress(false);
    setEditUser(false);
  };
  const handleUserDialogClose = () => {
    // fetchALLUser();
    setUpdateUser(false);
  };
  const handleDeleteClick = async (id) => {
    let url = apiUrl + `/address/delete`;
    if (!url) return;
    if (user && user.id) {
      const responce = await axios.delete(url, {
        data: { address_id: id, user_id: user.id },
      });
      if (responce.status === 200 || responce.status === 201) {
        fetchALLUser();
      }
    }
  };

  const handleEditClick = (id) => {
    if (id) {
      var item = userAddress.find((item) => item.id === id);
      if (item) {
        setEditUser(item);
        setAddNewAddress(false);
        setShopDialogOpen(true);
      }
    }
  };

  const addNewAddressfun = () => {
    setAddNewAddress(true);
    setShopDialogOpen(true);
  };
  const handelUserEdit = () => {
    setUpdateUser(true);
  };
  if (loadState) {
    return <LoaderComponent />;
  }

  return (
    <AccountSection>
      <AddressSection width={props.width}>
        <ProfileIcon class="profile-icon" />
        <DetailBottom width={props.width}>
          <div class="top-heading">
            <h1>
              <Trans>Personal Details</Trans>
            </h1>
            <h2 onClick={handelUserEdit}>
              <Trans>Edit</Trans>
            </h2>
          </div>
          <RowContainer>
            <CitySection xs={8}>
              <h1>
                <Trans>Name</Trans>
              </h1>
              <h2>{user && user.name}</h2>
            </CitySection>
            <StreetSection xs={4}>
              <h1>
                <Trans>Phone</Trans>{" "}
              </h1>
              <h2>{user && user.contact_number}</h2>
            </StreetSection>
          </RowContainer>
          <RowContainer>
            <EmailSection>
              <h1>
                <Trans>Email Address</Trans>
              </h1>
              <h2>{user && user.email}</h2>
            </EmailSection>
          </RowContainer>
        </DetailBottom>
        <ShipiingAddress>
          {userAddress && userAddress.length > 0
            ? userAddress.map((item) => (
                <UserInfo
                  user={item}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              ))
            : " "}
        </ShipiingAddress>
      </AddressSection>
      <button className="add-address" onClick={() => addNewAddressfun()}>
        <Trans> Add New Address</Trans>
      </button>
      <ProductDialog
        open={shopDialogOpen}
        addNewAddress={addNewAddress}
        handleDialogClose={handleProductDialogClose}
        userId={user ? user.id : null}
        user={addNewAddress ? null : editUser && editUser}
      />
      <UserEditDialog
        open={updateUser}
        handleUserDialogClose={handleUserDialogClose}
        userId={user ? user.id : null}
        user={user}
      />
    </AccountSection>
  );
};

export default AccountDetails;
