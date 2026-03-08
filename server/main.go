package main

import (
	"log"
	"server/db"
	"server/handlers"
	"server/models"
	"server/repository"
	"server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	db.Connect()

	db.DB.AutoMigrate(&models.Todo{})

	todoRepo := repository.NewTodoRepository(db.DB)
	todoHandler := handlers.NewTodoHandler(todoRepo)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders: []string{"Content-Type"},
	}))

	routes.SetupRoutes(r, todoHandler)

	r.Run(":8080")
}
