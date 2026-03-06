#include <stdio.h>
#include <stdlib.h>
#include <string.h>

//The exercise calls for heap allocated strings which is pretty annoying to deal with for free.

typedef struct node node;

struct node {
	struct node* prev;
	char* string;
	struct node*  next;
};

node* init_node() {
	node* new_node = (node*)malloc(sizeof(node));	
	new_node->prev = NULL;
	new_node->string = NULL;
	new_node->next = NULL;
	return new_node;
}

typedef struct{
	node* head;
	node* tail;
	int length;
} dbl_list;

// Sentinel nodes
void init_list(dbl_list* list) {
	list->head = (node*)malloc(sizeof(node));
	list->tail = (node*)malloc(sizeof(node));

	list->head->prev = NULL;
	list->head->next = list->tail;
	list->tail->prev = list->head;
	list->tail->next = NULL;

	list->head->string = NULL;
	list->tail->string = NULL;
}

void free_node(node* node) {
	free(node->string);
	free(node);
}

void free_list(dbl_list* list) {
	node* ref = list->head;
	while(ref != NULL) {
		node* next = ref->next;
		free_node(ref);
		ref = next;
	}
	free(list);
}

void print_list(dbl_list* list) {
	node* ref = list->head->next;
	while (ref != list->tail) {
		printf("{%s}\n", ref->string);
		ref = ref->next;
	}
}

void insert_after(dbl_list* list, node* cur_node, node* new_node) {
	node* ref = list->head;
	while (ref != cur_node) {
		ref = ref->next;
	}
	node* tmp = ref->next;
	ref->next = new_node;
	new_node->next = tmp;
	new_node->prev = ref;
	tmp->prev = new_node;
}

void insert_begin(dbl_list* list, node* cur_node) {
	cur_node->prev = list->head;
	cur_node->next = list->head->next;
	list->head->next = cur_node;
	cur_node->next->prev = cur_node;
}

void insert_end(dbl_list* list, node* cur_node) {
	cur_node->next = list->tail;
	cur_node->prev = list->tail->prev;
	list->tail->prev = cur_node;
	cur_node->prev->next = cur_node;
}

void delete_end(dbl_list* list) {
	if (list->tail->prev == list->head)
		return;
	node* ref = list->tail->prev;
	ref->prev->next = list->tail;
	list->tail->prev = ref->prev;
	free_node(ref);
}

int main() {
	dbl_list* list = (dbl_list*)malloc(sizeof(dbl_list));
	init_list(list);

	node* hello = init_node();
	hello->string = malloc(6);
	strncpy(hello->string, "hello", 6);
	node* world = init_node();
	world->string = malloc(6);
	strncpy(world->string, "world", 6);
	node* ryan = init_node();
	ryan->string = malloc(5);	
	strncpy(ryan->string, "ryan", 5);

	insert_begin(list, hello);
	insert_end(list, world);
	insert_after(list, hello, ryan);

	print_list(list);
	
	delete_end(list);

	print_list(list);

	free_list(list);
}
