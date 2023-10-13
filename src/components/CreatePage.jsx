// react
import React, { useContext } from "react";

// context
import { ThemeContext } from "../context/ThemeContext";

// mui
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";

const CreatePage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-screen border-1 border-red-500 grid grid-cols-12 md:space-x-6">
      <div className="bg-lightColor1 col-span-12 pt-4 flex justify-center rounded-md md:col-span-4 dark:bg-darkColor2">
        <h1 className="text-4xl">Players</h1>
      </div>
      <div className="border-1 col-span-12 pt-4 grid px-6 bg-lightColor1 rounded-md md:col-span-8 dark:bg-darkColor2">
        <FormControl>
          <Box className="flex items-center space-x-8 pl-4 mb-4 rounded-md bg-lightColor2 dark:bg-darkColor1">
            <FormLabel className="w-1/2 text-center" id="radio-rounds">
              <h1 className="font-leagueSpartan text-xl text-darkColor1 dark:text-lightColor1">
                Number of rounds
              </h1>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-rounds"
              defaultValue="3"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="1"
                control={
                  <Radio
                    size="extrasmall"
                    sx={
                      theme === "dark"
                        ? {
                            color: "#ffffff",
                            "&.Mui-checked": {
                              //   color: "#ffffff",
                            },
                          }
                        : {}
                    }
                  />
                }
                label={<h1 className="text-md mt-1 font-leagueSpartan">1</h1>}
              />
              <FormControlLabel
                value="3"
                control={
                  <Radio
                    size="extrasmall"
                    sx={
                      theme === "dark"
                        ? {
                            color: "#ffffff",
                            "&.Mui-checked": {
                              //   color: "#ffffff",
                            },
                          }
                        : {}
                    }
                  />
                }
                label={<h1 className="text-md mt-1 font-leagueSpartan">3</h1>}
              />
              <FormControlLabel
                value="5"
                control={
                  <Radio
                    size="extrasmall"
                    sx={
                      theme === "dark"
                        ? {
                            color: "#ffffff",
                            "&.Mui-checked": {
                              //   color: "#ffffff",
                            },
                          }
                        : {}
                    }
                  />
                }
                label={<h1 className="text-md mt-1 font-leagueSpartan">5</h1>}
              />
            </RadioGroup>
          </Box>
          <Box className="flex items-center space-x-8 pl-4 mb-4 rounded-md bg-lightColor2 dark:bg-darkColor1">
            <FormLabel className="w-1/2 text-center" id="radio-drawtime">
              <h1 className="font-leagueSpartan text-xl text-darkColor1 dark:text-lightColor1">
                Draw time for each round
              </h1>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-drawtime"
              defaultValue="60"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="30"
                control={
                  <Radio
                    size="extrasmall"
                    sx={
                      theme === "dark"
                        ? {
                            color: "#ffffff",
                            "&.Mui-checked": {
                              //   color: "#ffffff",
                            },
                          }
                        : {}
                    }
                  />
                }
                label={<h1 className="text-md mt-1 font-leagueSpartan">30s</h1>}
              />
              <FormControlLabel
                value="60"
                control={
                  <Radio
                    size="extrasmall"
                    sx={
                      theme === "dark"
                        ? {
                            color: "#ffffff",
                            "&.Mui-checked": {
                              //   color: "#ffffff",
                            },
                          }
                        : {}
                    }
                  />
                }
                label={<h1 className="text-md mt-1 font-leagueSpartan">60s</h1>}
              />
              <FormControlLabel
                value="120"
                control={
                  <Radio
                    size="extrasmall"
                    sx={
                      theme === "dark"
                        ? {
                            color: "#ffffff",
                            "&.Mui-checked": {
                              //   color: "#ffffff",
                            },
                          }
                        : {}
                    }
                  />
                }
                label={
                  <h1 className="text-md mt-1 font-leagueSpartan">120s</h1>
                }
              />
            </RadioGroup>
          </Box>
          <Box className="flex items-center space-x-8 pl-4 mb-4 rounded-md bg-lightColor2 dark:bg-darkColor1">
            <FormLabel className="w-1/2 text-center" id="radio-difficulty">
              <h1 className="font-leagueSpartan text-xl text-darkColor1 dark:text-lightColor1">
                Difficulty Level
              </h1>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-difficulty"
              defaultValue="easy"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="easy"
                control={
                  <Radio
                    size="small"
                    sx={
                      theme === "dark"
                        ? {
                            color: "#ffffff",
                            "&.Mui-checked": {
                              //   color: "#ffffff",
                            },
                          }
                        : {}
                    }
                  />
                }
                label={
                  <h1 className="text-md mt-1 font-leagueSpartan">Easy</h1>
                }
              />
              <FormControlLabel
                value="medium"
                control={
                  <Radio
                    size="extrasmall"
                    sx={
                      theme === "dark"
                        ? {
                            color: "#ffffff",
                            "&.Mui-checked": {
                              //   color: "#ffffff",
                            },
                          }
                        : {}
                    }
                  />
                }
                label={
                  <h1 className="text-md mt-1 font-leagueSpartan">Medium</h1>
                }
              />
              <FormControlLabel
                value="hard"
                control={
                  <Radio
                    size="extrasmall"
                    sx={
                      theme === "dark"
                        ? {
                            color: "#ffffff",
                            "&.Mui-checked": {
                              //   color: "#ffffff",
                            },
                          }
                        : {}
                    }
                  />
                }
                label={
                  <h1 className="text-md mt-1 font-leagueSpartan">Hard</h1>
                }
              />
            </RadioGroup>
          </Box>
          <Box className="text-lightColor1  font-semibold mx-auto mb-4">
            <button
              className="p-2 w-[10rem] bg-blueColor1 rounded-full transition-all text-lg hover:bg-blueColor2 hover:cursor-pointer"
              // onClick={() => setPage("create")}
            >
              Start
            </button>
          </Box>
        </FormControl>
      </div>
    </div>
  );
};

export default CreatePage;
