<?php 
    $data = json_encode( [
        "button-opened" => "opened",
        "button-closed" => "collapsed",
        "collapse-opened" => "show",
        "collapse-closed" => "",
        "item-closed" => "",
        "item-opened" => "",
        "mode" => "multiple",
        "active" => [1, 2, 3]
    ] );
?>
<pockets-app #default='data' v-bind='<?= $data ?>' v-cloak>

    <accordion 
        class='accordion p-2 bg-secondary-light d-block' 
        v-bind='data'
        v-model:active='data.active' 
        #default='accordion' 
    >

        <div class='mb-2'>
            {{data}}
        </div>

        <div class='d-flex gap-2 mb-2'>
            <div class='d-flex gap-2'>
                <button 
                    :disabled='data.mode=="single"' 
                    class='btn btn-primary-md text-black px-3' 
                    @click='accordion.openAll'
                >
                    Open All
                </button>
                <button 
                    class='btn btn-primary-dk text-white px-3' 
                    @click='accordion.closeAll'
                >
                    Close All
                </button>
            </div>
            <div class='flex-grow-1'>
                <select v-model='data.mode' class='form-control'>
                    <option value='single'>Single</option>
                    <option value='multiple'>Multiple</option>
                </select>
            </div>
            
        </div>
        <div class='grid columns-4 gap-2 mb-2'>
            <div v-for='k in ["button-opened", "button-closed", "collapse-opened", "collapse-closed"]'>
                <label class='form-label'>
                    {{k}} 
                </label>
                <input v-model='data[k]' class='form-control'>
            </div>
        </div>


        <accordion-item v-for='i in 10' class='accordion-item' :tab-id='i'>
            <accordion-button
                class='p-2 col-12 bg-primary-lt accordion-button' 
                tag='button'
            >
                Tab {{i}} Trigger is {{accordion.isOpen(i) ? "Open" : "Closed"}}
            </accordion-button>
            <accordion-collapse 
                class='col-12 accordion-collapse collapse'
            >
                <div class='accordion-body text-white' :style='{background: "#" + i + i + i }'>
                    <p>Tab {{i}} Content</p>
                    <accordion-item :tab-id='i+".nested"' class='p2 bg-primary-dk text-white accordion-item mb-2'>
                        <accordion-button class='accordion-button' tag='button'>
                            Nested
                        </accordion-button>
                        <accordion-collapse class='accordion-collapse collapse' collapse-opened='show p-2'>
                            <div class='mb-2 fw-8 fs-20'>
                                Nested
                            </div>
                            <accordion-button class='btn text-primary-dk bg-white'> 
                                Close Nested
                            </accordion-button>
                        </accordion-collapse>
                    </accordion-item>
                    <div class=' d-flex gap-1'>
                        <accordion-button :tab-id='i-1' class='btn btn-primary-dk text-white' v-if="i>1" button-opened='d-none'>
                            Previous Tab
                        </accordion-button>
                        <accordion-button :tab-id='i' class='btn btn-primary-md text-black'>
                            Close This Tab
                        </accordion-button>
                        <accordion-button :tab-id='i+1' class='btn btn-primary-dk text-white' v-if="i<10" button-opened='d-none'>
                            Next Tab
                        </accordion-button>
                    </div>
                </div>
            </accordion-collapse>
        </accordion-item>

    </accordion>

</pockets-app>