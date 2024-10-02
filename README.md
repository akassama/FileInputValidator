# FileInputValidator Library

A JavaScript library for validating file inputs with custom file type acceptance and maximum size limits. This library allows you to enforce file validation rules easily by specifying file types and size limits, with built-in defaults for common use cases.

## Features

* Supports validation for different categories of file types: documents, images, audio, video, or all files.
* Enforces a maximum file size, defaulting to 5MB (configurable).
* Easy-to-use API with customizable options.
* Automatically generates user-friendly labels for allowed file types and maximum file size.

### Dependencies
This library requires jQuery. Ensure that you have jQuery included in your project:
* jQuery (version 3.6.0 or higher)

## Getting Started

Add the JavaScript library to your project:

```
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="path/to/FileInputValidator.js"></script>
```
Ensure you have jQuery loaded before this library, as it depends on jQuery for DOM manipulation.


## Usage
#### Default Initialization

To use the default settings `(accept: '*', maxSize: 5MB)`:

```
$(document).ready(function () {
    new FileInputValidator('.my-file-input');
});
```

## Custom Initialization
#### Custom File Type Categories

You can specify a specific type category for file input. For example, to only accept documents and set the max size to 10MB:

```
$(document).ready(function () {
    new FileInputValidator('#my-file-input', {
        accept: 'docs',
        maxSize: 10
    });
});
```

## DeployAvailable categories are:

* `docs`: Accepts `.doc, .docx, .pdf, .txt, .rtf, .odt.`
* `images`: Accepts all image types `(image/*)`.
* `audio`: Accepts all audio types, as well as `.mp3, .wav, .ogg`.
* `video`: Accepts all video types, as well as `.mp4, .avi, .mov.`:
* `all`: Accepts all file types.

### Custom File Extensions
To specify a custom list of allowed file extensions:

```
$(document).ready(function () {
    new FileInputValidator('.another-file-input', {
        accept: '.doc,.docx',
        maxSize: 10
    });
});
```

### Example HTML
```
<form>
    <label for="upload_file">Upload a Document:</label>
    <input type="file" class="my-file-input" id="upload_file" name="upload_file" required>
</form>
```

When used with the library, the above input will display an additional label below the input that specifies the allowed file types and maximum file size.

### License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

### Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.
