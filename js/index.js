$(document).ready(function () {
    $('#esportsTable').DataTable({
        responsive: true,
        paging: false,
        searching: false,

        info: false,
        columnDefs: [
            {
                "targets": [0],
                "searchable": false // Disable search for this column
            }
        ],
        stripeClasses: [], // Disables row striping

    });

});

document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('esportsTable');
    const filterDropdown = document.getElementById('filterDropdown');
    const generalSearch = document.getElementById('generalSearch');

    const playerCheckboxes = document.getElementById('playerCheckboxes');
    const teamCheckboxes = document.getElementById('teamCheckboxes');
    const statTypeCheckboxes = document.getElementById('statTypeCheckboxes');

    const players = new Set();
    const statTypes = new Set();
    const teams = new Set();

    // Loop through the table and extract unique players, stat types, and teams
    Array.from(table.rows).forEach((row, index) => {
        if (index === 0) return; // Skip the header row

        const player = row.cells[4].textContent.trim();
        const statType = row.cells[7].textContent.trim();
        const team = row.cells[5].textContent.trim();

        players.add(player);
        statTypes.add(statType);
        teams.add(team);
    });

    // Populate the filter options dynamically
    players.forEach(player => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" class="playerFilter form-check-input" value="${player}"> ${player}`;
        playerCheckboxes.appendChild(label);
    });

    statTypes.forEach(statType => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" class="statTypeFilter form-check-input" value="${statType}"> ${statType}`;
        statTypeCheckboxes.appendChild(label);
    });

    teams.forEach(team => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" class="teamFilter form-check-input" value="${team}"> ${team}`;
        teamCheckboxes.appendChild(label);
    });

    // Function to filter the table rows
    function filterTable() {
        const selectedPlayers = Array.from(document.querySelectorAll('.playerFilter:checked')).map(input => input.value);
        const selectedTeams = Array.from(document.querySelectorAll('.teamFilter:checked')).map(input => input.value);
        const selectedStatTypes = Array.from(document.querySelectorAll('.statTypeFilter:checked')).map(input => input.value);

        Array.from(table.rows).forEach((row, index) => {
            if (index === 0) return; // Skip the header row

            const player = row.cells[4].textContent.trim();
            const statType = row.cells[7].textContent.trim();
            const team = row.cells[5].textContent.trim();

            // Check if the row matches the filter criteria
            const matchesPlayer = selectedPlayers.length ? selectedPlayers.includes(player) : true;
            const matchesStatType = selectedStatTypes.length ? selectedStatTypes.includes(statType) : true;
            const matchesTeam = selectedTeams.length ? selectedTeams.includes(team) : true;

            // Toggle row visibility based on the filters
            row.style.display = (matchesPlayer && matchesStatType && matchesTeam) ? '' : 'none';
        });
    }

    // Add event listener for the general search bar
    generalSearch.addEventListener('input', function () {
        const searchTerm = generalSearch.value.toLowerCase();

        // Filter checkboxes by search term
        Array.from(playerCheckboxes.querySelectorAll('label')).forEach(label => {
            const playerText = label.textContent.toLowerCase();
            label.style.display = playerText.includes(searchTerm) ? '' : 'none';
        });

        Array.from(teamCheckboxes.querySelectorAll('label')).forEach(label => {
            const teamText = label.textContent.toLowerCase();
            label.style.display = teamText.includes(searchTerm) ? '' : 'none';
        });

        Array.from(statTypeCheckboxes.querySelectorAll('label')).forEach(label => {
            const statTypeText = label.textContent.toLowerCase();
            label.style.display = statTypeText.includes(searchTerm) ? '' : 'none';
        });
    });

    // Add event listeners for checkbox changes
    document.addEventListener('change', filterTable);
});



// Toggle Navbar
document.getElementById('navbarToggle').addEventListener('click', function () {
    const navbarItems = document.getElementById('navbarItems');
    navbarItems.classList.toggle('active');
});


$(document).ready(function () {
    // Iterate through each row
    $('#esportsTable tbody tr').each(function () {
        // Find the text in the Stat Type column (8th column)
        var statType = $(this).find('td:nth-child(8)').text().trim();

        // Find the first number in the row (2nd column for this example)
        var numberCell = $(this).find('td:nth-child(2) span');

        // Apply background color based on the condition
        if (statType.includes('1-3 Kills')) {
            numberCell.addClass('bg-red');
        } else {
            numberCell.addClass('bg-orange');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get all table rows in the tbody
    const rows = document.querySelectorAll("#esportsTable tbody tr");

    rows.forEach((row) => {
        // Get the Prize Picks and Underdog values
        const prizePicksCell = row.querySelector("td:nth-child(9) .number");
        const underdogCell = row.querySelector("td:nth-child(10) .number");

        if (prizePicksCell && underdogCell) {
            const prizePicksValue = parseFloat(prizePicksCell.textContent.trim());
            const underdogValue = parseFloat(underdogCell.textContent.trim());

            // Apply bg-green to the lower value and bg-black to the higher value
            if (prizePicksValue < underdogValue) {
                prizePicksCell.classList.add("bg-green");
                underdogCell.classList.add("bg-normal");
            } else {
                prizePicksCell.classList.add("bg-normal");
                underdogCell.classList.add("bg-green");
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Select all checkboxes in the "Used" column
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const row = checkbox.closest("tr"); // Get the parent row of the clicked checkbox
            row.querySelector(".exposure").classList.add("opacity-50");
            const teamName = row.querySelector("td:nth-child(6)").textContent.trim(); // Get the team name
            const allRows = document.querySelectorAll("tbody tr"); // Get all rows in the table

            // Count the number of selected checkboxes with the same team name
            const sameTeamCount = Array.from(allRows).filter(r => {
                const teamCell = r.querySelector("td:nth-child(6)");
                return teamCell && teamCell.textContent.trim() === teamName && r.querySelector('input[type="checkbox"]').checked;
            }).length;

            // Update the Exposure column for rows with the same team name
            allRows.forEach(r => {
                const teamCell = r.querySelector("td:nth-child(6)");
                if (teamCell && teamCell.textContent.trim() === teamName) {
                    const exposureCell = r.querySelector(".exposure");
                    if (sameTeamCount > 0) {
                        exposureCell.innerHTML = ` <div class="info-badge-wrapper">
  <!-- Main SVG Icon -->
  <svg class="info-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ErrorOutlineIcon">
    <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
  </svg>

  <!-- Badge Circle and Text -->
  <div class="badge-wrapper">
    <svg width="20" height="20" fill="#1675E0" viewBox="0 0 24 24">
      <!-- Circle -->
      <circle class="badge-circle" cx="12" cy="12" r="10"></circle>
      <!-- Text (Number) -->
        <text x="50%" y="50%" text-anchor="middle" fill="#fff" font-size="12px" dy=".3em">${sameTeamCount}</text>
    </svg>
  </div>
</div>`;
                    } else {
                        exposureCell.innerHTML = ""; // Clear the icon if no rows are selected
                        exposureCell.classList.remove("opacity-50");

                    }
                }
            });
        });
    });
});


// multiple page logic
$(document).ready(function () {
    $(".custom-btn-group button").click(function () {
        const target = $(this).data("target");
        this.classList.add("active");
        $(this).siblings().removeClass("active");
        $(".page").fadeOut();
        $(".page").hide();        // Hide all pages
        $("#" + target).fadeIn();     // Show the targeted page
    });
});


document.addEventListener("DOMContentLoaded", function () {


    const prizePicksCheckboxes = document.querySelectorAll(".prizePicksCheckbox");
    const checkedCountElement = document.getElementById("checkedCount");
    const clearButton = document.getElementById("clearChecks");

    let checkedCount = 0;

    // Function to update the counter
    function updateCheckedCount() {
        checkedCountElement.textContent = checkedCount;
    }

    // Add event listener to each checkbox
    prizePicksCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {

            if (this.checked) {
                $('#checkedCountContainer').fadeIn();

                checkedCount++;
            } else {
                if (checkedCount === 1) {
                    $('#checkedCountContainer').fadeOut();
                }
                checkedCount--;
            }
            updateCheckedCount();
        });
    });

    // Clear all checkboxes
    clearButton.addEventListener("click", function () {
        prizePicksCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        $('#checkedCountContainer').fadeOut();
        checkedCount = 0;
        updateCheckedCount();
    });

    // Initialize the counter
    updateCheckedCount();
});

// dropdown search
document.querySelectorAll('.rs-picker-menu-group-title').forEach((title) => {
    title.addEventListener('click', () => {
        const parent = title.parentElement;
        parent.classList.toggle('folded');
    });
});


function toggleFilter(sectionId) {
    const section = document.getElementById(sectionId);
    const icon = section.previousElementSibling.querySelector(".filter-icon");

    // Toggle visibility
    if (section.style.display === "none" || section.style.display === "") {
        section.style.display = "block";
        icon.classList.remove("fa-caret-down");
        icon.classList.add("fa-caret-up");
    } else {
        section.style.display = "none";
        icon.classList.remove("fa-caret-up");
        icon.classList.add("fa-caret-down");
    }
}
