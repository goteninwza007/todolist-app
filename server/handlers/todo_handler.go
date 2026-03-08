package handlers

import (
	"net/http"
	"server/models"
	"server/repository"
	"strconv"

	"github.com/gin-gonic/gin"
)

type TodoHandler struct {
	repo *repository.TodoRepository
}

func NewTodoHandler(repo *repository.TodoRepository) *TodoHandler {
	return &TodoHandler{repo: repo}
}

func response(c *gin.Context, statusCode int, message string, data any) {
	c.JSON(statusCode, gin.H{
		"statusCode": statusCode,
		"message":    message,
		"data":       data,
	})
}

func (h *TodoHandler) GetAll(c *gin.Context) {
	todos, err := h.repo.GetAll()
	if err != nil {
		response(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	response(c, http.StatusOK, "success", todos)
}

func (h *TodoHandler) Create(c *gin.Context) {
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		response(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	if err := h.repo.Create(&todo); err != nil {
		response(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	response(c, http.StatusCreated, "success", todo)
}

func (h *TodoHandler) Update(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	todo, err := h.repo.GetByID(uint(id))
	if err != nil {
		response(c, http.StatusNotFound, "todo not found", nil)
		return
	}
	if err := c.ShouldBindJSON(&todo); err != nil {
		response(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	if err := h.repo.Update(&todo); err != nil {
		response(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	response(c, http.StatusOK, "success", todo)
}

func (h *TodoHandler) Delete(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := h.repo.Delete(uint(id)); err != nil {
		response(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	response(c, http.StatusOK, "deleted", nil)
}
