import React, { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  Button,
} from "@material-tailwind/react";

export default function ExampleComponent() {
  // Define a list of cards
  const job = {
    // Default values
    Title: 'Title11',
    Company: 'Company11',
    Field: 'Field11',
    Salary: 'Salary11',
    Location: 'Location11',
    Logosrc: 'Logosrc11',
    Time: 'Time11',
    Remote: 'Remote11',
    Status: 'Status11',
    Details: 'Details11',
  };

  const cards = [
    {
      title: job.Title,
      field: job.Field,
      status: job.Status,
    },
    {
      title: job.Title,
      field: job.Field,
      status: job.Status,
    },
    {
      title: job.Title,
      field: job.Field,
      status: job.Status,
    },
    {
      title: job.Title,
      field: job.Field,
      status: job.Status,
    },
    {
      title: job.Title,
      field: job.Field,
      status: job.Status,
    },
    {
      title: job.Title,
      field: job.Field,
      status: job.Status,
    },
    {
      title: job.Title,
      field: job.Field,
      status: job.Status,
    },
        {
      title: job.Title,
      field: job.Field,
      status: job.Status,
    },
  ];

  return (
    <div style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
      <List>
        {cards.map((card, index) => (
          <ListItem key={index}>
            <Card className="w-full p-6 h-64 flex flex-col justify-between">
              <div>
                <Typography color="black" size="h1" weight="bold">
                  {card.title}
                </Typography>
                <div className="p-4">
                  <Typography color="black">{card.field}</Typography>
                </div>
              </div>
              <div className="p-4 mt-auto">
                <Typography color="blue">Status: {card.status}</Typography>
                <div className="space-x-4">
                  <Button color="blue">Details</Button>
                  <Button color="purple">Application</Button>
                </div>
              </div>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
}