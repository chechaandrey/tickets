<table>
    <thead>
        <tr><th><%= this.l10n("from") %></th><th><%= this.l10n("to") %></th></tr>
    </thead>
    <tbody>
        <tr><td>
            <table data-id="from">
                <tbody>
                    <tr><td><%= this.l10n("country") %></td><td><select name="countryFrom">
                        <option value=""<%= countryFrom?'':' selected="selected"' %>><%= this.l10n("Please select a country") %></option>
                    </select></td></tr>
                    <tr data-id="city"><td><%= this.l10n("city(airport)") %></td><td data-id="airport"><select name="depairp">
                        <option value=""<%= depairp?'':' selected="selected"' %>><%= this.l10n("Please select a airport") %></option>
                    </select></td></tr>
                </tbody>
            </table>
        </td><td>
            <table data-id="to">
                <tbody>
                    <tr><td><%= this.l10n("country") %></td><td><select name="countryTo">
                        <option value=""<%= countryTo?'':' selected="selected"' %>><%= this.l10n("Please select a country") %></option>
                    </select></td></tr>
                    <tr data-id="city"><td><%= this.l10n("city(airport)") %></td><td data-id="airport"><select name="arrairp">
                        <option value=""<%= arrairp?'':' selected="selected"' %>><%= this.l10n("Please select a airport") %></option>
                    </select></td></tr>
                </tbody>
            </table>
        </td></tr>
        <tr><td><strong><%= this.l10n("there") %></strong></td><td><strong><input type="checkbox" value="<%= type %>" name="type" id="ticketsSearchLabel"<%= type=='RT'?' checked="checked"':'' %> /><label for="ticketsSearchLabel"><%= this.l10n("back") %></label></strong></td></tr>
        <tr><td><input type="text" data-name="altdepdate" value="" /><input type="text" name="depdate" value="" /></td><td><span data-id="back"><input type="text" data-name="altarrdate" value="" /><input type="text" name="arrdate" value="" /></span></td></tr>
        <tr><th colspan="2"><%= this.l10n("additionally") %></th></tr>
        <tr><td colspan="2">
            <span><span><%= this.l10n("adults") %></span><select name="passadt">
                <option value="1"<%= passadt==1?' selected="selected"':'' %>>1</option>
                <option value="2"<%= passadt==2?' selected="selected"':'' %>>2</option>
                <option value="3"<%= passadt==3?' selected="selected"':'' %>>3</option>
                <option value="4"<%= passadt==4?' selected="selected"':'' %>>4</option>
                <option value="5"<%= passadt==5?' selected="selected"':'' %>>5</option>
            </select></span>
            <span><span><%= this.l10n("children") %></span><select name="passcnn">
                <option value="0"<%= passcnn==0?' selected="selected"':'' %>>0</option>
                <option value="1"<%= passcnn==1?' selected="selected"':'' %>>1</option>
                <option value="2"<%= passcnn==2?' selected="selected"':'' %>>2</option>
                <option value="3"<%= passcnn==3?' selected="selected"':'' %>>3</option>
                <option value="4"<%= passcnn==4?' selected="selected"':'' %>>4</option>
                <option value="5"<%= passcnn==5?' selected="selected"':'' %>>5</option>
            </select></span>
            <span><span><%= this.l10n("babies") %></span><select name="passinf">
                <option value="0"<%= passinf==0?' selected="selected"':'' %>>0</option>
                <option value="1"<%= passinf==1?' selected="selected"':'' %>>1</option>
                <option value="2"<%= passinf==2?' selected="selected"':'' %>>2</option>
                <option value="3"<%= passinf==3?' selected="selected"':'' %>>3</option>
                <option value="4"<%= passinf==4?' selected="selected"':'' %>>4</option>
                <option value="5"<%= passinf==5?' selected="selected"':'' %>>5</option>
            </select></span>
            <span><span><%= this.l10n("Infants with a place") %></span><select name="passins">
                <option value="0"<%= passins==0?' selected="selected"':'' %>>0</option>
                <option value="1"<%= passins==1?' selected="selected"':'' %>>1</option>
                <option value="2"<%= passins==2?' selected="selected"':'' %>>2</option>
                <option value="3"<%= passins==3?' selected="selected"':'' %>>3</option>
                <option value="4"<%= passins==4?' selected="selected"':'' %>>4</option>
                <option value="5"<%= passins==5?' selected="selected"':'' %>>5</option>
            </select></span>
            <span><span><%= this.l10n("Class") %></span><select name="classflight">
                <option value="all"<%= classflight=='all'?' selected="selected"':'' %>><%= this.l10n("All") %></option>
                <option value="economy"<%= classflight=='economy'?' selected="selected"':'' %>><%= this.l10n("Economy") %></option>
                <option value="business"<%= classflight=='business'?' selected="selected"':'' %>><%= this.l10n("Business") %></option>
                <option value="first"<%= classflight=='first'?' selected="selected"':'' %>><%= this.l10n("First") %></option>
            </select></span>
            <span><input type="checkbox" value="<%= direct %>" id="ticketsSearchLabel1" name="direct"<%= direct==1?' checked="checked"':'' %> /><label for="ticketsSearchLabel1"><%= this.l10n("Only direct flights") %></label></span>
        </td></tr>
    </tbody>
    <thead>
        <tr><th colspan="2"><a data-id="clear" href="javascript:void(0)"><%= this.l10n("clear") %></a><a data-id="search" href="javascript:void(0)"><%= this.l10n("search") %></a></th></tr>
    </thead>
</table>
