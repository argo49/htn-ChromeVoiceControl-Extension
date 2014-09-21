var groups = {};
$(document).ready(function () {
    $('#add-group').on('click', function () {
        insertGroup();
    });

    loadOptions();

    //Saves users Bundles
    function saveOptions() {
        chrome.storage.sync.set({"groups": groups});
    }

    function loadOptions() {
        chrome.storage.sync.get("groups", function(value) {
            console.log("loaded value: ", value);
            groups = value.groups;
            renderOptions();
        });
    }

    function renderOptions () {
        console.log('rendering options');
        for (var prop in groups) {
            console.log(prop, groups[prop]);
            showGroup(prop, groups[prop]);
        }
    }

    function showGroup (groupName, items) {
        $('.notification h3').remove();
        var group = $('<div class="group"/>');
        var title = $('<h3 class="group-title"/>');
        var urls  = $('<ul/>').addClass('group-urls');

        var deleteGroup = $('<div/>').addClass('delete-group').text('x');

        deleteGroup.on('click', function () {
            var groupName = $(this).siblings('.group-title').text();
            for (var prop in groups) {
                if (prop == groupName) {
                    groups[prop] = undefined;
                    $(this).closest('.group').remove();
                    saveOptions();
                }
            }
        });

        for (var i = 0; i < items.length; i++) {
            var urlItem = $('<li/>');
            urls.append(urlItem.text(items[i] + " x"));
            urlItem.on('click', removeUrl);
        }

        var newUrlInput = $('<input type="text" class="new-url" placeholder="eg. http://google.com/"/>');
        var newUrlLabel = $('<label/>').text('Add URL');

        newUrlInput.on('keyup', function (e) {
            if (e.which == 13 && this.value) {
                var urlItem = $('<li/>');

                urlItem.on('click', removeUrl);

                urls.append(urlItem.text(this.value + " x"));
                groups[$(this).siblings('.group-title').text()].push(this.value);
                saveOptions();
                newUrlInput.val("");
            }
        });

        group.prepend(title.text(groupName));
        group.append(deleteGroup);
        group.append(urls);
        group.append(newUrlLabel);
        group.append(newUrlInput);

        group.insertBefore($('#add-group').closest('.row'));

    }

    function removeUrl () {
        var strUrls = groups[$(this).parent().siblings('.group-title').text()];
        for (var i = 0; i < strUrls.length; i++) {
            if ($(this).text().indexOf(strUrls[i]) > -1) {
                strUrls.splice(i, 1);
                saveOptions();
            }
        }
        groups[$(this).siblings('.group-title').text()];
        $(this).remove();
    }

    function insertGroup () {
        $('.notification h3').remove();
        var group      = $('<div class="group"/>');
        var titleLabel = $('<label for="group-' + groups.length + '-name"/>').text('New Group');
        var titleInput = $('<input class="group-name" type="text" placeholder="Enter new group name"/>');
        var title      = $('<h3 class="group-title"/>');

        var urls = $('<ul/>').addClass('group-urls');

        titleInput.on('keyup', function (e) {

            if (e.which == 13 && this.value) {
                groups[this.value] = [];
                saveOptions();
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

                    urlItem.on('click', removeUrl);

                    urls.append(urlItem.text(this.value + " x"));
                    groups[$(this).siblings('.group-title').text()].push(this.value);
                    saveOptions();
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