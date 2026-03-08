package models

import "time"

type Size string
type Priority string
type Status string

const (
	SizeXS Size = "xs"
	SizeS  Size = "s"
	SizeM  Size = "m"
	SizeL  Size = "l"
	SizeXL Size = "xl"
)

const (
	PriorityLow    Priority = "low"
	PriorityMedium Priority = "medium"
	PriorityHigh   Priority = "high"
)

const (
	StatusTodo       Status = "todo"
	StatusInProgress Status = "in_progress"
	StatusDone       Status = "done"
)

type Todo struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title" gorm:"not null"`
	Description string    `json:"description"`
	Deadline    string    `json:"deadline"`
	Size        Size      `json:"size" gorm:"default:'m'"`
	Priority    Priority  `json:"priority" gorm:"default:'medium'"`
	Status      Status    `json:"status" gorm:"default:'todo'"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
