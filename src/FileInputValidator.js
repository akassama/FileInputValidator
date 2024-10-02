class FileInputValidator {
    constructor(selector, options = {}) {
        // Default settings
        this.defaults = {
            accept: 'all', // Default to 'all' files
            maxSize: 5     // Default max file size in MB
        };

        // Merge user options with defaults
        this.options = { ...this.defaults, ...options };

        // Determine the accepted file types
        this.acceptTypes = {
            docs: ".doc,.docx,.pdf,.txt,.rtf,.odt",
            images: "image/*",
            audio: "audio/*,.mp3,.wav,.ogg",
            video: "video/*,.mp4,.avi,.mov",
            all: "*/*"
        };

        // If 'accept' is a named category, use corresponding value, else use the provided value
        this.options.accept = this.acceptTypes[this.options.accept] || this.options.accept;

        // Apply validation to all selected elements
        $(selector).each((index, element) => {
            this.initFileInput($(element));
        });
    }

    initFileInput(inputElement) {
        // Set file accept attribute and max file size label
        inputElement.attr("accept", this.options.accept);
        const maxFileSizeText = "<p class='text-muted small'>Max file size: " + this.options.maxSize + "MB</p>";
        let acceptText = '';

        if (this.options.accept === '*/*') {
            acceptText = '<small class="text-muted small">Allowed file types: All files</small>';
        } else {
            acceptText = `<small class="text-muted small">Allowed file types: ${this.options.accept}</small>`;
        }

        inputElement.after(acceptText + maxFileSizeText);

        // Bind file input change event to validate the file
        inputElement.on('change', () => this.validateFile(inputElement));
    }

    validateFile(input) {
        let allowedTypes = input.attr('accept').split(',');
        let files = input[0].files;

        if (files.length > 0) {
            let invalidFile = false;
            let tooLargeFile = false;

            $.each(files, (index, file) => {
                let fileType = file.type;
                let fileExtension = file.name.split('.').pop().toLowerCase();

                // If not accepting all types, validate type/extension
                if (this.options.accept !== '*/*') {
                    if (!allowedTypes.some(type => type.trim() === fileType || type.trim() === `.${fileExtension}` || type.trim() === fileType.split('/')[0] + '/*')) {
                        invalidFile = true;
                        return false; // Break the loop if an invalid file is found
                    }
                }

                // Check if the file size exceeds the maximum limit (in bytes)
                if (file.size > this.options.maxSize * 1024 * 1024) {
                    tooLargeFile = true;
                    return false; // Break the loop if a file is too large
                }
            });

            if (invalidFile) {
                alert('Invalid file type selected. Please choose a valid file.');
                input.val(''); // Clear the file input
            } else if (tooLargeFile) {
                alert('File size exceeds the maximum allowed size of ' + this.options.maxSize + ' MB.');
                input.val(''); // Clear the file input
            }
        }
    }
}
