import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <Link to={`/car/${car.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{ minHeight: "280px", width: 320 }}
        style={{ cursor: "pointer" }}
      >
        <CardCover>
          <img
            src={car.imageUrl}
            srcSet={`${car.images}?auto=format&fit=crop&w=320&dpr=2 2x`}
            loading="lazy"
            alt={`${car.make} ${car.model}`}
          />
        </CardCover>
        <CardCover
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }}
        />
        <CardContent sx={{ justifyContent: "flex-end" }}>
          <Typography level="title-lg" textColor="#fff">
            {car.make} {car.model} ({car.year}){" "}
          </Typography>
          <Typography startDecorator={<EmailIcon />} textColor="neutral.300">
            {car.email}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
