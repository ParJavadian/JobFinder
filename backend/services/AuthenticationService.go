package services

import "github.com/dgrijalva/jwt-go"

func GenerateJWTToken(id uint, role string) (string, error) {
	// Create the token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":   id,
		"role": role,
	})

	// Sign the token with the secret
	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyJWTToken(tokenString string) (uint, string, error) {
	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	if err != nil {
		return 0, "", err
	}
	return uint(token.Claims.(jwt.MapClaims)["id"].(float64)), token.Claims.(jwt.MapClaims)["role"].(string), nil
}
