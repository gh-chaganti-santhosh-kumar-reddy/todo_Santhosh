namespace TodoApp.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; }
        [System.ComponentModel.DataAnnotations.Range(1, 5, ErrorMessage = "Priority must be between 1 (high) and 5 (low)")]
        public int Priority { get; set; } // 1 (high) - 5 (low)
        public string UserId { get; set; } = string.Empty!; // Foreign key to AspNetUsers, non-nullable
    }
}