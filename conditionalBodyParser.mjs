import express from "express";

// Apply JSON and URL-encoded body parsers unless route matches excluded paths
const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });

const excludedPaths = ["/api/upload"]; // any route you want to exclude

export const conditionalBodyParser = (req, res, next) => {
  if (excludedPaths.some(path => req.path.startsWith(path))) {
    return next(); // skip body parsing
  }

  jsonParser(req, res, (err) => {
    if (err) return next(err);
    urlencodedParser(req, res, next);
  });
};
