'use strict';


Blockly.JSON = new Blockly.Generator('JSON');


Blockly.JSON['start'] = function(block) {

    var json    = this.generalBlockToObj( block.getInputTargetBlock( 'json' ) );

    return json;
}

Blockly.JSON['true'] = function(block) {
    return true;
}


Blockly.JSON['false'] = function(block) {
    return false;
}


Blockly.JSON['string'] = function(block) {
    var string_value = block.getFieldValue( 'string_value' );

    return string_value ;
}


Blockly.JSON['number'] = function(block) {
    var number_value = Number(block.getFieldValue( 'number_value' ));

    return number_value ;
}


Blockly.JSON['dictionary'] = function(block) {

    var dictionary = {};

    for (var i = 0; i<block.length; i++) {
        var pair_key    = block.getFieldValue( 'key_field_'+i );
        var pair_value  = this.generalBlockToObj( block.getInputTargetBlock( 'element_'+i ) );

        dictionary[pair_key] = pair_value;
    }

    return dictionary;
}


Blockly.JSON['array'] = function(block) {

    var array = [];

    for (var i = 0; i<block.length; i++) {
        var element_value  = this.generalBlockToObj( block.getInputTargetBlock( 'element_'+i ) );

        array[i] = element_value;
    }

    return array;
}


Blockly.JSON.generalBlockToObj = function(block) {

    if(block) {

            // dispatcher:
        var func = this[block.type];
        if(func) {
            return func.call(this, block);
        } else {
            console.log("Don't know how to generate JSON code for a '"+block.type+"'");
        }
    } else {
        return null;
    }
}


Blockly.JSON.workspaceToJSON = function(workspace, block_id) {

    var json_text = '';

    var blocks = block_id
        ? [ workspace.getBlockById( block_id ) ]
        : workspace.getTopBlocks(true);

    for (var i = 0, block; block = blocks[i]; i++) {

        var obj = this.generalBlockToObj( block );
        json_text += JSON.stringify(obj, null, 4) + '\n\n';
    }

    return json_text;
};

