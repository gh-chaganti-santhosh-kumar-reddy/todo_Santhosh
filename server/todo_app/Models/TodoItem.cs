namespace TodoApp.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public int Priority { get; set; } // 1 (high) - 5 (low)
        public string UserId { get; set; } = string.Empty; // Foreign key to AspNetUsers
    }
}