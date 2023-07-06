import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemPrefix, Avatar, Card, CardHeader } from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import AvatarImg from "../images/avatar-1.jpg";
import Form from "./Form";
import CompanyHistory from "./CompanyHistory";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('form');
  const [activeComponentTitle, setActiveComponentTitle] = useState('form');

  const handleApplicationHistoryClick = () => {
    setActiveComponent('companyHistory');
    setActiveComponentTitle('companyHistory');
  };

  const handleProfileSettingClick = () => {
    setActiveComponent('form');
    setActiveComponentTitle('form');
  };

  const handleLogoutClick = () => {
    window.location.href = "/"; 
  };

  return (
    <Card className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="md:col-span-1">
          <div className="p-4">
            <div className="mb-2">
              <Avatar src={AvatarImg} alt="avatar" size="xl" className="mt-3" />
              <Typography color="blue-black" size="h5" className="mt-3">
                Name Lastname
              </Typography>
              <Typography color="blue-gray" size="paragraph" className="font-light mt-3">
                email@gmail.com
              </Typography>
            </div>
            <List>
              <ListItem onClick={handleProfileSettingClick}>
                <ListItemPrefix>
                  <Unicons.UilUserCircle className="h-5 w-5" />
                </ListItemPrefix>
                Profile Settings
              </ListItem>
              <ListItem onClick={handleApplicationHistoryClick}>
                <ListItemPrefix>
                  <Unicons.UilHistory className="h-5 w-5" />
                </ListItemPrefix>
                Application History
              </ListItem>
              <hr className="my-2 border-blue-gray-50" />
              <ListItem>
                <ListItemPrefix>
                  <Unicons.UilKeySkeleton className="h-5 w-5" />
                </ListItemPrefix>
                Change Password
              </ListItem>
              <ListItem onClick={handleLogoutClick}>
                <ListItemPrefix>
                  <Unicons.UilSignout className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </List>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="p-8">
            <CardHeader color="blue" className="mb-5 custom-header">
              <Typography color="black" style={{ fontSize: '24px' }}>
               
                {activeComponentTitle === 'form' ? ' Account Details' : ' Account History'}

              </Typography>
            </CardHeader>
            {activeComponent === 'form' ? <Form /> : <CompanyHistory />}
          </div>
        </div>
      </div>
    </Card>
  );
}
