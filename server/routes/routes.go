package routes

import (
	"server/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, h *handlers.TodoHandler) {
	api := r.Group("/api")
	{
		api.GET("/todos", h.GetAll)
		api.POST("/todos", h.Create)
		api.PUT("/todos/:id", h.Update)
		api.DELETE("/todos/:id", h.Delete)
	}
}
