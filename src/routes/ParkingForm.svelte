<script>
	import Fa from 'svelte-fa';
	import { faX, faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
	import { getContext } from 'svelte';
	export let parkingSpace;
	export let message;
	export let hasForm = false;
	export let onCancel = () => {};
	export let onOkay = () => {};

	const { close } = getContext('simple-modal');

	let value = 'Namn';
	let onChange = () => {};

	function _onCancel() {
		onCancel();
		close();
	}

	function _onOkay() {
		onOkay(value);
		close();
	}

	$: onChange(value);
</script>

<div class="rounded p-2 bg-{parkingSpace.color}-500 px-4 w-96">
	<div class="text-black">{parkingSpace.id} {parkingSpace.name}</div>

	{#if hasForm}
		<div class="">
			<input
				type="text"
				bind:value
				required
				class="form-input px-4 py-3 block w-full bg-black rounded text-white font-bold"
			/>
		</div>
	{/if}

	<div class="buttons text-black mt-2">
		<button on:click={_onCancel}><Fa icon={faCircleXmark} size="sm" /></button>
		<button on:click={_onOkay}><Fa icon={faCircleCheck} size="sm" /></button>
	</div>
</div>
