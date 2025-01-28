import L from "leaflet";
import { attackData } from "./staticData";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./App.css";

// Define custom icons for each continent
const icons = {
  Africa: L.icon({
    iconUrl: markerIcon as unknown as string,
    iconRetinaUrl: markerIcon2x as unknown as string,
    shadowUrl: markerShadow as unknown as string,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "africa",
  }),
  Asia: L.icon({
    iconUrl: markerIcon as unknown as string,
    iconRetinaUrl: markerIcon2x as unknown as string,
    shadowUrl: markerShadow as unknown as string,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "asia",
  }),
  Europe: L.icon({
    iconUrl: markerIcon as unknown as string,
    iconRetinaUrl: markerIcon2x as unknown as string,
    shadowUrl: markerShadow as unknown as string,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "europe",
  }),
  NorthAmerica: L.icon({
    iconUrl: markerIcon as unknown as string,
    iconRetinaUrl: markerIcon2x as unknown as string,
    shadowUrl: markerShadow as unknown as string,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "northAmerica",
  }),
  SouthAmerica: L.icon({
    iconUrl: markerIcon as unknown as string,
    iconRetinaUrl: markerIcon2x as unknown as string,
    shadowUrl: markerShadow as unknown as string,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "southAmerica",
  }),
  Oceania: L.icon({
    iconUrl: markerIcon as unknown as string,
    iconRetinaUrl: markerIcon2x as unknown as string,
    shadowUrl: markerShadow as unknown as string,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "oceania",
  }),
};

// Helper function to get the continent-specific icon
const getIconByContinent = (continent: string) =>
  icons[continent as keyof typeof icons] || icons["Africa"]; // Default to Africa if continent is not found

type MapProps = {
  title: number;
};

export const Map = ({ title }: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!map.current) {
      map.current = L.map("map").setView([20, 0], 2); // Global view
    }
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map.current);

    if (!map.current) {
      return;
    }

    let index = 0;
    let timeout: number | undefined;

    const interval = setInterval(() => {
      if (index >= attackData.attacks.length) {
        return clearInterval(interval);
      }

      const attack = attackData.attacks[index];
      const continent = attack.continent; // Assuming the `attack` object has a `continent` field
      const marker = L.marker([attack.latitude, attack.longitude], {
        icon: getIconByContinent(continent),
      }).addTo(map.current!);
      const popup = marker.bindPopup(`
                    <b>Attack Description:</b> ${attack.description}<br>
                    <b>Country:</b> ${attack.country_name}<br>
                    <b>City:</b> ${attack.city}<br>
                    <b>Attack Date:</b> ${attack.attack_date}<br>
                    <b>IP Address:</b> ${attack.ip}
                `);

      popup.openPopup();
      timeout = setTimeout(() => {
        popup.closePopup();
      }, 900);

      index++;
    }, 1000);

    return () => {
      clearInterval(interval);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      id="map"
      style={{ width: "100vw", height: `calc(100vh - ${title}px)` }}
    />
  );
};
