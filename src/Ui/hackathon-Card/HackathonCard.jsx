import React from "react";
import { Badge } from "@/Ui/Badge/Badge";
import { Link } from "react-router-dom";

const HackathonCard = ({
  title,
  description,
  dates,
  location,
  image,
  links,
}) => {
  return (
    <li className="relative ml-10 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <div className="absolute -left-14 top-2 flex items-center justify-center bg-white rounded-full w-12 h-12 overflow-hidden">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full  h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        {dates && (
          <time className="text-xs text-muted-foreground">{dates}</time>
        )}
        <h2 className="font-semibold leading-none">{title}</h2>
        {location && (
          <p className="text-sm text-muted-foreground">{location}</p>
        )}
        {description && (
          <span className="prose dark:prose-invert text-sm text-muted-foreground">
            {description}
          </span>
        )}
      </div>
      {links && links.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {links.map((link, idx) => (
            <Link href={link.href} key={idx}>
              <Badge title={link.title} className="flex gap-2">
                {link.icon}
                {link.title}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
};

export default HackathonCard;
