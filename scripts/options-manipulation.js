var groups = {};
$(document).ready(function () {
    $('#add-group').on('click', function () {
        insertGroup();
    });

    function loadData() {

    }

    function insertGroup () {
        var group = $('<div class="group"/>');
        var titleLabel = $('<label for="group-' + groups.length + '-name"/>').text('New Group');
        var titleInput = $('<input class="group-name" type="text" placeholder="Enter new group name"/>');
        var title = $('<h3 class="group-title"/>');

        var urls = $('<ul/>').addClass('group-urls');

        titleInput.on('keyup', function (e) {

            if (e.which == 13 && this.value) {
                groups[this.value] = [];
                // save action?
                titleLabel.remove();
                titleInput.remove();
                group.prepend(title.text(this.value));
                group.append(urls);
                insertNewUrls();
            }
        });

        function insertNewUrls() {
            var newUrlInput = $('<input type="text" class="new-url" placeholder="eg. http://google.com/"/>');
            var newUrlLabel = $('<label/>').text('Add URL');

            newUrlInput.on('keyup', function (e) {
                if (e.which == 13 && this.value) {
                    var urlItem = $('<li/>');

                    urlItem.on('click', function () {
                        var strUrls = groups[$(this).parent().siblings('.group-title').text()];
                        for (var i = 0; i < strUrls.length; i++) {
                            if ($(this).text().indexOf(strUrls[i]) > -1) {
                                console.log(strUrls[i]);
                                strUrls.splice(i, 1);
                                // Save
                            }
                        }
                        groups[$(this).siblings('.group-title').text()];
                        $(this).remove();
                    });

                    urls.append(urlItem.text(this.value + " x"));
                    groups[$(this).siblings('.group-title').text()].push(this.value);
                    // save
                    newUrlInput.remove();
                    newUrlLabel.remove();
                    insertNewUrls();
                }
            });

            group.append(newUrlLabel);
            group.append(newUrlInput);
            newUrlInput.focus();

        }

        // Insert into DOM
        group.append(titleLabel).append(titleInput);

        group.insertBefore($('#add-group').closest('.row'));
    }

});