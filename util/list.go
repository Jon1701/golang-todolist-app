package util

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
)

func ParseRequestBody(r *http.Request, x interface{}) error {
	body, errRead := ioutil.ReadAll(r.Body)

	if errRead != nil {
		return errors.New("failed to read request body")
	}

	errUnmarshal := json.Unmarshal([]byte(body), x)

	if errUnmarshal != nil {
		return errors.New("failed to unmarshal request body")
	}

	return nil
}
