package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"os/exec"

	"github.com/pkg/errors"
)

type netlifySite struct {
	SiteID string `json:"siteID"`
	Domain string `json:"Domain"`
}

func main() {
	by, err := ioutil.ReadFile("parked.json")
	if err != nil {
		log.Fatal(errors.Wrap(err, "read file: parked.json"))
	}

	var sites []netlifySite
	if err := json.Unmarshal(by, &sites); err != nil {
		log.Fatal(errors.Wrap(err, "json: unmarshal"))
	}

	for _, site := range sites {
		log.Println("deploying", site.Domain)

		{
			cmd := exec.Command("yarn", "clean")
			cmd.Stdout = os.Stdout
			cmd.Stderr = os.Stderr
			if err := cmd.Run(); err != nil {
				log.Fatal(errors.Wrap(err, "run: yarn clean"))
			}
		}

		{
			cmd := exec.Command("yarn", "tmpl")
			cmd.Stdout = os.Stdout
			cmd.Stderr = os.Stderr
			cmd.Env = append(os.Environ(), "DOMAIN="+site.Domain)
			if err := cmd.Run(); err != nil {
				log.Fatal(errors.Wrap(err, "run: yarn tmpl"))
			}
		}

		{
			cmd := exec.Command("yarn", "production")
			cmd.Stdout = os.Stdout
			cmd.Stderr = os.Stderr
			if err := cmd.Run(); err != nil {
				log.Fatal(errors.Wrap(err, "run: yarn production"))
			}
		}

		{
			cmd := exec.Command("netlify", "deploy", "-p", "-s", site.SiteID, "-d", "dist")
			cmd.Stdout = os.Stdout
			cmd.Stderr = os.Stderr
			if err := cmd.Run(); err != nil {
				log.Fatal(errors.Wrap(err, "run: netlify deploy"))
			}
		}
	}
}
