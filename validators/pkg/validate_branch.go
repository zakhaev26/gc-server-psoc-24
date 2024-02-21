package validate

import (
	"fmt"

	enum "github.com/p-society/gc-server/enums/pkg"
	model "github.com/p-society/gc-server/models/pkg"
)

func ValidateBranch(p model.Player) error {

	for _, branch := range enum.Branches {
		if branch == p.Branch {
			return nil
		}
	}

	return fmt.Errorf("invalid Branch: %s", p.Branch)
}
