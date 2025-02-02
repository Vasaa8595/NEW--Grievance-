import { Component } from '@angular/core';

@Component({
  selector: 'app-component1',
  standalone: true,
  imports: [],
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css'],
})
export class Component1Component {
  // Method to handle form submission
  async onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    
    console.log('Form submitted'); // Debugging to check if onSubmit is triggered

    // Gather form values
    const form = event.target as HTMLFormElement;
    const category = (form.querySelector('#category') as HTMLSelectElement)?.value;
    const summary = (form.querySelector('#summary') as HTMLInputElement)?.value;
    const description = (form.querySelector('#description') as HTMLTextAreaElement)?.value;

    // Validate inputs
    if (!category || !summary || !description) {
      alert('Message not sent: Please fill in all the fields.');
      return;
    }

    try {
      // Simulate sending data to the server
      const response = await fetch('https://example.com/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, summary, description }),
      });

      if (response.ok) {
        // Show success message
        alert('Message successfully sent!');
      } else {
        // Show server error message
        alert('Message not sent: Server error. Please try again.');
      }
    } catch (error) {
      // Handle network errors
      alert('Message not sent: Network error. Please check your connection and try again.');
    }
  }
}
